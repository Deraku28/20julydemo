describe('Basic Test Setup', () => {
  it('should work with basic assertions', () => {
    expect(1 + 1).toBe(2);
    expect('hello').toBe('hello');
    expect(true).toBe(true);
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('test');
    expect(result).toBe('test');
  });

  it('should handle arrays and objects', () => {
    expect([1, 2, 3]).toContain(2);
    expect({ name: 'test' }).toEqual({ name: 'test' });
  });
}); 