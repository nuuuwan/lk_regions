import { MathX, Color, WWW } from "@nuuuwan/utils-js-dev";
import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import { APP_NAME } from "../constants/Constants.js";
import { LRUCache, DataStructures } from "./BaseUtils.js";

import {
  ID_FIELD_KEY,
  KEY_OTHER,
  TABLE_NAMES,
} from "../constants/GIG2Constants.js";

let adhocValueKeyToColor = {};

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
            if (isNaN(value)) {
              value = 0;
            }
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

  static getValueEntriesSortedByValue(tableRow) {
    const valueKeys = GIG2.getValueKeys(tableRow);
    return valueKeys
      .map((valueKey) => [valueKey, tableRow[valueKey]])
      .sort((a, b) => b[1] - a[1]);
  }

  static getMaxValueKey(tableRow) {
    const valueKeys = GIG2.getValueKeys(tableRow);
    const maxValueKey = valueKeys.reduce(function (maxValueKey, valueKey) {
      if (valueKey !== KEY_OTHER) {
        if (tableRow[maxValueKey] < tableRow[valueKey]) {
          maxValueKey = valueKey;
        }
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

  static async getTableIndexIndex() {
    return await LRUCache.get(
      "getTableIndexIndex",
      GIG2.getTableIndexIndexNoCache
    );
  }

  static async getTableIndexIndexNoCache() {
    return await DataStructures.buildIndex(TABLE_NAMES, GIG2.getTableIndex);
  }
}
