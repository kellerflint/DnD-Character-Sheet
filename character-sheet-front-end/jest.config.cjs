module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|scss|jpg|png)$": "identity-obj-proxy",
        "^axios$": "<rootDir>/src/__mocks__/axios.js"
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};