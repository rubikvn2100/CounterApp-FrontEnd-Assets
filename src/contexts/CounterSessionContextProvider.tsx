import React, { createContext, useState, useEffect, useContext } from "react";
import { useConfig } from "./ConfigContextProvider";
import {
  getApiCounter,
  postApiCounter,
  postApiSession,
} from "../utils/apiHandler";

interface CounterSessionContextProps {
  counter: number;
  sessionStatus: string;
  addTimestamp: () => void;
  setReconnect: () => void;
}

const CounterSessionContext = createContext<CounterSessionContextProps>({
  counter: 0,
  sessionStatus: "",
  addTimestamp: () => console.log("Default addTimestamp function called."),
  setReconnect: () => console.log("Default setReconnect function called."),
});

interface CounterSessionProviderProps {
  children: React.ReactNode;
}

export const CounterSessionProvider: React.FC<CounterSessionProviderProps> = ({
  children,
}) => {
  const [counter, setCounter] = useState(0);
  const [token, setToken] = useState("");
  const [sessionDuration, setSessionDuration] = useState(0);
  const [tokenExpireTime, setTokenExpireTime] = useState(0);
  const [sessionStatus, setSessionStatus] = useState("Connecting");
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const [evaluateSecond, setEvaluateSecond] = useState(1);

  const { apiUrl } = useConfig();

  const addTimestamp = () => {
    const timestamp = Date.now() / 1000;

    setTimestamps((prevTimestamps) => [...prevTimestamps, timestamp]);
    setCounter(counter + 1);
  };

  const setReconnect = () => setSessionStatus("Connecting");

  const requestUpdateCounter = async () => {
    try {
      const data = await postApiCounter(apiUrl, token, timestamps);
      setCounter(data.counter);

      setTokenExpireTime(Date.now() / 1000 + sessionDuration);
    } catch (error) {
      console.error(`Failed to request counter value: ${error}`);
    }

    setTimestamps([]);
  };

  useEffect(() => {
    const newSession = async () => {
      try {
        const sessionData = await postApiSession(apiUrl);
        setToken(sessionData.token);
        setSessionDuration(sessionData.sessionDuration);
        setTokenExpireTime(Date.now() / 1000 + sessionData.sessionDuration);

        const counterData = await getApiCounter(apiUrl, sessionData.token);
        setCounter(counterData.counter);
      } catch (error) {
        console.error(`Failed to create new session: ${error}`);
      }
    };

    if (sessionStatus === "Connecting") {
      newSession();
    }
  }, [apiUrl, sessionStatus]);

  useEffect(() => {
    const requestCounterValue = async () => {
      try {
        const data = await getApiCounter(apiUrl, token);
        setCounter(data.counter);
      } catch (error) {
        console.error(`Failed to request counter value: ${error}`);
      }
    };

    if (timestamps.length > 0) {
      setEvaluateSecond(1);
    }

    const intervalId = setInterval(() => {
      if (token) {
        if (timestamps.length > 0) {
          requestUpdateCounter();
        } else {
          requestCounterValue();
          setEvaluateSecond(evaluateSecond + 1);
        }
      }
    }, evaluateSecond * 1000);

    return () => clearInterval(intervalId);
  }, [token, timestamps, evaluateSecond]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now() / 1000;
      const hasMoreThanTenSeconds = tokenExpireTime - currentTime > 10;

      if (token !== "" && hasMoreThanTenSeconds) {
        setSessionStatus("Live");
        return;
      }

      if (sessionStatus === "Live") {
        if (timestamps.length > 0) {
          requestUpdateCounter();
        }

        setSessionStatus("Stopped");
        setToken("");
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [token, tokenExpireTime, timestamps, sessionStatus]);

  return (
    <CounterSessionContext.Provider
      value={{ counter, sessionStatus, addTimestamp, setReconnect }}
    >
      {children}
    </CounterSessionContext.Provider>
  );
};

export const useCounterSession = () => useContext(CounterSessionContext);
