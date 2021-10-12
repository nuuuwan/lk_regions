import { MathX, Color, WWW } from "@nuuuwan/utils-js-dev";
import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import { APP_NAME } from "../constants/Constants.js";
let adhocValueKeyToColor = {};

const ID_FIELD_KEY = "entity_id";
const OTHER_LIMIT = 0.05;
const KEY_OTHER = "other";
const MERGE_ALIAS_MAP = {
  moor: "muslim_and_malay",
  malay: "muslim_and_malay",
  sri_lankan_tamil: "all_tamil",
  ind_tamil: "tamil",
  roman_catholic: "all_christian",
  other_christian: "all_christian",
};

export default class GIG2 {
  static async getTable(tableName) {
    const url = `/${APP_NAME}/data/gig2/${tableName}.tsv`;
    return await WWW.tsv(url);
  }

  static async getTableIndex(tableName) {
    const table = await GIG2.getTable(tableName);
    const valueKeys = GIG2.getValueKeys(table[0]);
    return table.reduce(function (tableIndex, tableRow) {
      tableIndex[tableRow[ID_FIELD_KEY]] = Object.entries(tableRow).reduce(
        function (cleanTableRow, [key, value]) {
          if (valueKeys.includes(key)) {
            value = parseFloat(value);
          }
          cleanTableRow[key] = value;
          return cleanTableRow;
        },
        {}
      );
      return tableIndex;
    }, {});
  }

  static getValueKeys(tableRow) {
    const valueCellKeys = Object.keys(tableRow).filter(
      (cellKey) =>
        !(
          cellKey.includes("total_") ||
          cellKey.includes("_id") ||
          cellKey.includes("result_ut") ||
          cellKey.includes("valid") ||
          cellKey.includes("rejected") ||
          cellKey.includes("polled") ||
          cellKey.includes("electors")
        )
    );
    return valueCellKeys;
  }

  static getMaxValueKey(tableRow) {
    const valueKeys = GIG2.getValueKeys(tableRow);
    const maxValueKey = valueKeys.reduce(function (maxValueKey, valueKey) {
      if (tableRow[maxValueKey] < tableRow[valueKey]) {
        maxValueKey = valueKey;
      }
      return maxValueKey;
    }, valueKeys[0]);
    return maxValueKey;
  }

  static getMinMaxValueP(dataList, valueKey) {
    return dataList.reduce(
      function ([minValueP, maxValueP], tableRow) {
        const sumValue = GIG2.getSumValues(tableRow);
        const value = tableRow[valueKey];
        const valueP = value / sumValue;
        return [Math.min(minValueP, valueP), Math.max(maxValueP, valueP)];
      },
      [1.0, 0.0]
    );
  }

  static getSumValues(tableRow) {
    const valueKeys = GIG2.getValueKeys(tableRow);
    return MathX.sum(valueKeys.map((valueKey) => tableRow[valueKey]));
  }

  static getValueKeyP(tableRow, valueKey) {
    const sumValues = GIG2.getSumValues(tableRow);
    return tableRow[valueKey] / sumValues;
  }

  static getValueKeyColor(valueKey) {
    if (FIELD_NAME_TO_COLOR[valueKey]) {
      return FIELD_NAME_TO_COLOR[valueKey];
    }
    if (!adhocValueKeyToColor[valueKey]) {
      adhocValueKeyToColor[valueKey] = Color.getRandomHSLA();
    }
    return adhocValueKeyToColor[valueKey];
  }

  static getTableRowColor(tableRow) {
    const maxValueKey = GIG2.getMaxValueKey(tableRow);
    return GIG2.getValueKeyColor(maxValueKey);
  }

  static getValuePToRankP(dataList, valueKey) {
    const sortedValuePs = dataList
      .map((tableRow) => GIG2.getValueKeyP(tableRow, valueKey))
      .sort();
    const nValues = sortedValuePs.length;
    return sortedValuePs.reduce(function (valuePToRankP, valueP, iValue) {
      valuePToRankP[valueP] = iValue / nValues;
      return valuePToRankP;
    }, {});
  }

  static getFirstRow(tableIndex) {
    return Object.values(tableIndex)[0];
  }

  static getTotalRow(tableIndex) {
    const firstRow = GIG2.getFirstRow(tableIndex);
    const valueKeys = GIG2.getValueKeys(firstRow);
    return valueKeys.reduce(function (totalRow, key) {
      totalRow[key] = MathX.sum(
        Object.values(tableIndex).map((tableRow) => tableRow[key])
      );
      return totalRow;
    }, {});
  }

  static getValueSum(tableRow) {
    const valueKeys = GIG2.getValueKeys(tableRow);
    return MathX.sum(valueKeys.map((valueKey) => tableRow[valueKey]));
  }

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
      mergedTableIndex[regionID] = GIG2.mergeKeysOnTableRow(tableRow);
      return mergedTableIndex;
    },
    {});
  }

  static mergeAndExpandOtherOnTable(tableIndex) {
    const mergedTableIndex = GIG2.mergeKeysOnTable(tableIndex);

    const totalRow = GIG2.getTotalRow(mergedTableIndex);
    const valueKeys = GIG2.getValueKeys(totalRow);
    const valueSum = GIG2.getValueSum(totalRow);

    const [otherValueKeys, nonOtherValueKeys] = valueKeys.reduce(
      function ([otherValueKeys, nonOtherValueKeys], valueKey) {
        if (valueKey === KEY_OTHER) {
          otherValueKeys.push(valueKey);
        }
        if (totalRow[valueKey] / valueSum < OTHER_LIMIT) {
          otherValueKeys.push(valueKey);
        } else {
          nonOtherValueKeys.push(valueKey);
        }
        return [otherValueKeys, nonOtherValueKeys];
      },
      [[], []]
    );

    const sortedNonOtherKeys = nonOtherValueKeys
      .map(function (key) {
        return { key, value: totalRow[key] };
      })
      .sort((a, b) => b.value - a.value)
      .map((x) => x.key);

    const expandedTableIndex = Object.entries(mergedTableIndex).reduce(
      function (expandedTableIndex, [regionID, tableRow]) {
        expandedTableIndex[regionID] = GIG2.expandOtherOnTableRow(
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
