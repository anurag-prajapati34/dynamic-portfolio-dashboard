import NodeCache from "node-cache";

const globalForCache = global as unknown as {
  appCacheInstance?: NodeCache;
};

export const cache =
  globalForCache.appCacheInstance ||
  new NodeCache({
    stdTTL: 20,
    checkperiod: 20,
  });

if (process.env.NODE_ENV !== "production") {
  globalForCache.appCacheInstance = cache;
}
