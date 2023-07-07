const { getGreeting } = require('./greeting');

test('returns greeting with custom name', () => {
  expect(getGreeting('Sam')).toBe('Hello Sam!');
});
