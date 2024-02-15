/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {},
    moduleNameMapper: {
        '^.+\\.(css|less)$': '<rootDir>/CSSStub.js',
        '^@components/(.*)': '<rootDir>/src/components/$1',
        '^@groups/(.*)': '<rootDir>/src/features/groups/$1',
    },
}
