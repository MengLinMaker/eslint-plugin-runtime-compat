/**
 * Extracts the keys of an object to array with correct TypeScript.
 * @param object - The object.
 * @return Object key array.
 */
export const objectKeys = <T extends object>(object: T) =>
  Object.keys(object) as (keyof T)[]
