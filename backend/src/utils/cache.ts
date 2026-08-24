import NodeCache from "node-cache";

const globalForCache = global as unknown as {
  appCacheInstance?: NodeCache;
};

export const cache =
  globalForCache.appCacheInstance ||
  new NodeCache({
    stdTTL: 60 * 60,
    checkperiod: 60 * 60,
  });

if (process.env.NODE_ENV !== "production") {
  globalForCache.appCacheInstance = cache;
}
