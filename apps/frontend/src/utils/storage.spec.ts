import storage from './storage';

describe('Testing `storage` utility', () => {
  afterEach(() => localStorage.clear());

  it('should return null', () => {
    const value = storage('unknown-key');

    expect(value).toBe(null);
  });

  it('should store a number value', () => {
    const sampleKey = 'age';
    const sampleValue = 123;

    const storeResult = storage(sampleKey, sampleValue);

    expect(storeResult).toBe(true);
  });

  it('should store and return a number value', () => {
    const sampleKey = 'age';
    const sampleValue = 123;

    const storeResult = storage(sampleKey, sampleValue);

    expect(storeResult).toBe(true);

    const value = storage<number>(sampleKey);

    expect(typeof value).toBe('number');
    expect(value).toBe(sampleValue);
  });

  it('should store and return a string value', () => {
    const sampleKey = 'hello';
    const sampleValue = 'world';

    const storeResult = storage(sampleKey, sampleValue);

    expect(storeResult).toBe(true);

    const value = storage<string>(sampleKey);

    expect(typeof value).toBe('string');
    expect(value).toBe(sampleValue);
  });

  it('should store and return an empty value', () => {
    const sampleKey = 'hello';
    const sampleValue = '';

    const storeResult = storage(sampleKey, sampleValue);

    expect(storeResult).toBe(true);

    const value = storage<string>(sampleKey);

    expect(typeof value).toBe('string');
    expect(value).toBe(sampleValue);
  });

  it('should store and return a boolean value', () => {
    const sampleKey = 'isDark';
    const sampleValue = true;

    const storeResult = storage(sampleKey, sampleValue);

    expect(storeResult).toBe(true);

    const value = storage<boolean>(sampleKey);

    expect(typeof value).toBe('boolean');
    expect(value).toBe(sampleValue);
  });

  it('should store an object and return the same object', () => {
    const user = {
      name: 'Sahin',
      age: 99,
    };

    const result = storage('user', user);

    expect(result).toBe(true);

    const value = storage<typeof user>('user');

    expect(value).toMatchObject(user);
  });

  it('should store and remove a value', () => {
    const sampleKey = 'hello';
    const sampleValue = 'world';

    const storeResult = storage(sampleKey, sampleValue);

    expect(storeResult).toBe(true);

    const removeResult = storage(sampleKey, null);

    expect(removeResult).toBe(true);
  });
});
