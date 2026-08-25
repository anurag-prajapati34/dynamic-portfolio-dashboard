import NodeCache from "node-cache";

const globalForCache = global as unknown as {
  yahooCacheInstance?: NodeCache;
  googleCacheInstance?: NodeCache;
};

export const yahooCache =
  globalForCache.yahooCacheInstance ||
  new NodeCache({
    stdTTL: 60 * 60,
    checkperiod: 60 * 60,
  });

export const googleCache =
  globalForCache.googleCacheInstance ||
  new NodeCache({
    stdTTL: 60 * 60,
    checkperiod: 60 * 60,
  });

if (process.env.NODE_ENV !== "production") {
  globalForCache.yahooCacheInstance = yahooCache;
  globalForCache.googleCacheInstance = googleCache;
}
