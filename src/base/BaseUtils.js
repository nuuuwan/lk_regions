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
  static numberRaw(x) {
    if (x > 1_000_000) {
      return (x / 1_000_000).toPrecision(DEFAULT_PRECISION) + 'M';
    }
    if (x > 1_000) {
      return  (x / 1_000).toPrecision(DEFAULT_PRECISION) + 'K';
    }
    return x.toFixed(DEFAULT_PRECISION);
  }

  static percentRaw(x, xSum) {
    if (!xSum) {
      return '-';
    }
    return (x * 100.0 / xSum).toPrecision(DEFAULT_PRECISION) + '%';
  }


  static number(x) {
    const numberRaw = Humanize.numberRaw(x);
    const style = {
      fontSize: 12,
    }
    return (
      <div style={style}>
        {numberRaw}
      </div>
    )
  }

  static percent(x, xSum) {
    const p = x / xSum;
    const percentRaw = Humanize.percentRaw(x, xSum);
    let color;
    if (p > 0.5) {
      color = 'black';
    }else if (p > 0.05) {
      color = 'gray';
    }else {
      color = 'lightgray';
    }
    const style = {
      color,
      fontSize: 18,
    }
    return (
      <div style={style}>
        {percentRaw}
      </div>
    )
  }
}
