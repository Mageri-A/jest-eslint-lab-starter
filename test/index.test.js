const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
    test('capitalizes the first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('returns an empty string when given an empty string', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('capitalizes after special characters like hyphens', () => {
        expect(capitalizeWords('hello-world')).toBe('Hello-World');
    });

    test('capitalizes a single-word string', () => {
        expect(capitalizeWords('hello')).toBe('Hello');
    });
});
describe('filterActiveUsers', () => {
    test('returns only active users from a mixed array', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
            { name: 'Carol', isActive: true }
        ];
        expect(filterActiveUsers(users)).toEqual([
            { name: 'Alice', isActive: true },
            { name: 'Carol', isActive: true }
        ]);
    });

    test('returns an empty array when all users are inactive', () => {
        const users = [
            { name: 'Bob', isActive: false },
            { name: 'Dave', isActive: false }
        ];
        expect(filterActiveUsers(users)).toEqual([]);
    });

    test('returns an empty array when given an empty array', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });
});
describe('logAction', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-11-27T12:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('returns the correct log string for valid inputs', () => {
        expect(logAction('login', 'Alice')).toBe(
            'User Alice performed login at 2024-11-27T12:00:00.000Z'
        );
    });

    test('throws an error when action is missing', () => {
        expect(() => logAction(undefined, 'Alice')).toThrow();
    });

    test('throws an error when username is missing', () => {
        expect(() => logAction('login')).toThrow();
    });

    test('throws an error when given empty strings', () => {
        expect(() => logAction('', '')).toThrow();
    });
});