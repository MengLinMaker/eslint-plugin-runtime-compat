export const _Cache = Cache

export const createCacheInternally = () => {
  return { cache: new Cache() }
}
