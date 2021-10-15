import { MathX } from "@nuuuwan/utils-js-dev";
import GIG2 from "./GIG2.js";

import {
  OTHER_LIMIT_GLOBAL,
  OTHER_LIMIT_LOCAL,
  MERGE_ALIAS_MAP,
  KEY_OTHER,
} from "../constants/GIG2Constants.js";

export default class GIG2Merge {
  static expandOtherOnTableRow(tableRow, sortedNonOtherKeys, otherValueKeys) {
    let expandedTableRow = sortedNonOtherKeys.reduce(function (
      expandedTableRow,
      nonOtherKey
    ) {
      expandedTableRow[nonOtherKey] = tableRow[nonOtherKey];
      return expandedTableRow;
    },
    {});

    const otherValueSum = MathX.sum(
      otherValueKeys.map((valueKey) => tableRow[valueKey])
    );
    expandedTableRow[KEY_OTHER] = otherValueSum;

    return expandedTableRow;
  }

  static mergeKeysOnTableRow(tableRow) {
    return Object.entries(tableRow).reduce(function (
      mergedTableRow,
      [key, value]
    ) {
      const mergedKey = MERGE_ALIAS_MAP[key] ? MERGE_ALIAS_MAP[key] : key;
      if (!mergedTableRow[mergedKey]) {
        mergedTableRow[mergedKey] = 0;
      }
      mergedTableRow[mergedKey] += value;
      return mergedTableRow;
    },
    {});
  }

  static mergeKeysOnTable(tableIndex) {
    return Object.entries(tableIndex).reduce(function (
      mergedTableIndex,
      [regionID, tableRow]
    ) {
      mergedTableIndex[regionID] = GIG2Merge.mergeKeysOnTableRow(tableRow);
      return mergedTableIndex;
    },
    {});
  }

  static mergeAndExpandOtherOnTable(tableIndex) {
    const mergedTableIndex = GIG2Merge.mergeKeysOnTable(tableIndex);

    const totalRow = GIG2.getTotalRow(mergedTableIndex);
    const valueKeys = GIG2.getValueKeys(totalRow);
    const valueSum = GIG2.getValueSum(totalRow);

    const nonOtherValueKeysGlobal = valueKeys.filter(
      (valueKey) =>
        totalRow[valueKey] / valueSum >= OTHER_LIMIT_GLOBAL &&
        valueKey !== KEY_OTHER
    );
    const nonOtherValueKeysLocalSet = Object.values(mergedTableIndex).reduce(
      function (nonOtherValueKeysLocalSet, tableRow) {
        const tableRowValueSum = GIG2.getValueSum(tableRow);
        return valueKeys.reduce(function (otherValueKeysLocal, valueKey) {
          if (
            tableRow[valueKey] / tableRowValueSum >= OTHER_LIMIT_LOCAL &&
            valueKey !== KEY_OTHER
          ) {
            nonOtherValueKeysLocalSet.add(valueKey);
          }
          return nonOtherValueKeysLocalSet;
        });
      },
      new Set(nonOtherValueKeysGlobal)
    );
    const nonOtherValueKeys = Array.from(nonOtherValueKeysLocalSet);

    const otherValueKeys = valueKeys.filter(
      (valueKey) => !nonOtherValueKeysLocalSet.has(valueKey)
    );

    const sortedNonOtherKeys = nonOtherValueKeys
      .map(function (key) {
        return { key, value: totalRow[key] };
      })
      .sort((a, b) => b.value - a.value)
      .map((x) => x.key);

    const expandedTableIndex = Object.entries(mergedTableIndex).reduce(
      function (expandedTableIndex, [regionID, tableRow]) {
        expandedTableIndex[regionID] = GIG2Merge.expandOtherOnTableRow(
          tableRow,
          sortedNonOtherKeys,
          otherValueKeys
        );
        return expandedTableIndex;
      },
      {}
    );
    return expandedTableIndex;
  }
}
