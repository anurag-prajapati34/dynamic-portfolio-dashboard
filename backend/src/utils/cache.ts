import nodeCache from "node-cache";

export const cache = new nodeCache({
  stdTTL: 15,
  checkperiod: 16,
});
