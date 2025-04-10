import '@testing-library/jest-dom';
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
