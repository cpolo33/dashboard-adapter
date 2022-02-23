function sum(a: number, b: number) {
  return a + b;
}

test('dummy test', () => {
  expect(sum(1, 2)).toBe(3);
});
