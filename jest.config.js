module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/test"],
  testMatch: [
    "**/*.test.ts",
    "**/*.test.tsx"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  }
};
