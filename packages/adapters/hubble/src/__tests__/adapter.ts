function times(a: number, b: number) {
  return a * b;
}

test('dummy test', () => {
  expect(times(3, 2)).toBe(6);
});
