module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/test"],
  testMatch: [
    "**/*.test.ts",
    "**/*.test.tsx"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
