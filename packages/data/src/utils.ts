import type { JsonKeys } from './types'

/**
 * Extracts the keys of an object to array with correct TypeScript.
 * @param object - The object.
 * @return Object key array.
 */
export const objectKeys = <T extends object>(object: T) => Object.keys(object) as (keyof T)[]

/**
 * Parse stringified JSON string array.
 * @param jsonKeys
 * @returns
 */
export const parseJsonKeys = (jsonKeys: JsonKeys) => JSON.parse(jsonKeys) as string[]

/**
 * Stringify JSON string array.
 * @param stringArray
 * @returns
 */
export const stringifyJsonKeys = (stringArray: string[]) => JSON.stringify(stringArray) as JsonKeys
