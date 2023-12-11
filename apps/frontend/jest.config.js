module.exports = {
  preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
};
