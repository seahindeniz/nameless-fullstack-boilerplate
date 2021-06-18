type PrimitiveType = string | number | boolean | null;

type ValueType =
  | PrimitiveType
  | PrimitiveType[]
  | { [x in string | number]: ValueType };

function getItem(key: string) {
  const value = localStorage.getItem(key);

  if (value === null) return null;

  return JSON.parse(value);
}

function setItem(key: string, value: ValueType) {
  localStorage.setItem(key, JSON.stringify(value));

  return true;
}

function removeItem(key: string) {
  localStorage.removeItem(key);

  return true;
}

/**
 * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
 */
function storage<T>(key: string): T;
/**
 * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
 */
function storage(key: string, value: null | undefined): boolean;
/**
 * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
 *
 * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
 */
function storage(key: string, value: ValueType): boolean;
function storage<T>(key: string, value?: ValueType): ValueType | T {
  if (arguments.length === 1) return getItem(key);

  if (value === null || value === undefined) return removeItem(key);

  return setItem(key, value);
}

export default storage;
