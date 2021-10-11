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
