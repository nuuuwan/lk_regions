import { MathX } from "@nuuuwan/utils-js-dev";
const LRU = require("lru-cache");
const LRU_CACHE = new LRU();

export class DataStructures {
  static async buildIndex(keyIDs, asyncFuncKeyToData) {
    const dataList = await Promise.all(
      keyIDs.map(async function (keyID) {
        return await asyncFuncKeyToData(keyID);
      })
    );

    return keyIDs.reduce(function (index, keyID, iKey) {
      index[keyID] = dataList[iKey];
      return index;
    }, {});
  }

  static invertDict(keyToValue) {
    return Object.entries(keyToValue).reduce(function (
      valueToKeys,
      [key, value]
    ) {
      if (value) {
        if (!valueToKeys[value]) {
          valueToKeys[value] = [];
        }
        valueToKeys[value].push(key);
      }
      return valueToKeys;
    },
    {});
  }
}

const DEFAULT_PRECISION = 3;

export class Humanize {
  static number(x) {
    if (!x) {
      return "-";
    }

    if (x > 1_000_000) {
      return (x / 1_000_000).toPrecision(DEFAULT_PRECISION) + "M";
    }
    if (x > 1_000) {
      return (x / 1_000).toPrecision(DEFAULT_PRECISION) + "K";
    }
    return x;
  }

  static percent(x, xSum) {
    if (!xSum || !x) {
      return "-";
    }
    const p = x / xSum;
    if (p < 0.01) {
      return "<1%";
    }
    return (p * 100.0).toPrecision(DEFAULT_PRECISION) + "%";
  }
}

export class StatX {
  static mean(xList) {
    const n = xList.length;
    return MathX.sum(xList) / n;
  }

  static variance(xList) {
    const n = xList.length;
    const eX2 = MathX.sum(xList.map((x) => x * x)) / n;
    const mean = StatX.mean(xList);
    return eX2 - mean;
  }

  static stdev(xList) {
    return Math.sqrt(StatX.variance(xList));
  }
}

export class LRUCache {
  static async get(cacheKey, asyncFallback) {
    const hotItemInLRUCache = LRU_CACHE.get(cacheKey);
    if (hotItemInLRUCache) {
      return JSON.parse(hotItemInLRUCache);
    }

    const hotItemInLocalStorage = localStorage.getItem(cacheKey);
    if (hotItemInLocalStorage) {
      LRU_CACHE.set(cacheKey, hotItemInLocalStorage);
      return JSON.parse(hotItemInLocalStorage);
    }

    const coldItemRaw = await asyncFallback();
    const coldItem = JSON.stringify(coldItemRaw);
    LRU_CACHE.set(cacheKey, coldItem);

    try {
      localStorage.setItem(cacheKey, coldItem);
    } catch (QuotaExceededError) {
      localStorage.clear();
    }
    return coldItemRaw;
  }
}
