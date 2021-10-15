import { MathX, Color, WWW } from "@nuuuwan/utils-js-dev";
import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import { APP_NAME } from "../constants/Constants.js";
import { LRUCache, DataStructures } from "./BaseUtils.js";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BallotIcon from "@mui/icons-material/Ballot";

let adhocValueKeyToColor = {};

const ID_FIELD_KEY = "entity_id";
const OTHER_LIMIT_GLOBAL = 0.01;
const OTHER_LIMIT_LOCAL = 0.2;
const KEY_OTHER = "other";
const MERGE_ALIAS_MAP = {
  moor: "muslim",
  malay: "muslim",
  sri_lankan_tamil: "tamil",
  indian_tamil: "tamil",
  roman_catholic: "christian",
  other_christian: "christian",
};

const PRESIDENTIAL_ELECTION_YEAR_LIST = [
  2019, 2015, 2010, 2005, 1999, 1994, 1988, 1982,
];

const PARLIAMENTARY_ELECTION_YEAR_LIST = [
  1989, 1994, 2000, 2001, 2004, 2010, 2015, 2020,
];

export const COLOR_INFO_LIST = []
  .concat(
    // Presidential Elections
    PRESIDENTIAL_ELECTION_YEAR_LIST.map(function (electionYear) {
      return {
        label: `${electionYear} Presidential Election`,
        tableName: `regions_ec.${electionYear}_election_presidential.result`,
        Icon: BallotIcon,
      };
    }),

    // Parliamentary Elections
    PARLIAMENTARY_ELECTION_YEAR_LIST.map(function (electionYear) {
      return {
        label: `${electionYear} Parliamentary Election`,
        tableName: `regions_ec.${electionYear}_election_parliamentary.result`,
        Icon: BallotIcon,
      };
    }),

    // 2012 Census
    [
      {
        label: "Ethnicity",
        tableName: "regions.2012_census.ethnicity_of_population",
        Icon: PeopleAltIcon,
      },
      {
        label: "Religion",
        tableName: "regions.2012_census.religious_affiliation_of_population",
        Icon: PeopleAltIcon,
      },
    ]
  )
  .sort((a, b) => -a.tableName.localeCompare(b.tableName));

const TABLE_NAMES = COLOR_INFO_LIST.map((d) => d.tableName);
export const DEFAULT_TABLE_NAME = TABLE_NAMES[0];

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
