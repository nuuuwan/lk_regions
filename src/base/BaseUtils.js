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
}
