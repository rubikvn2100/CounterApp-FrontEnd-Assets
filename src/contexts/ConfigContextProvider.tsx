import React, { createContext, useState, useEffect, useContext } from "react";
import { getStageConfig } from "../utils/apiHandler";

interface ConfigContextProps {
  apiUrl: string;
}

const ConfigContext = createContext<ConfigContextProps>({
  apiUrl: "",
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState({ apiUrl: "" });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setConfig(await getStageConfig());
      } catch (error) {
        console.error(`Failed to fetch config: ${error}`);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ apiUrl: config.apiUrl }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
