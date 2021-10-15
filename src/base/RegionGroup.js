import { WWW } from "@nuuuwan/utils-js-dev";

import { APP_NAME } from "../constants/Constants.js";
import Ents, { ENT } from "./Ents.js";
import GIG2 from "./GIG2.js";
import GIG2Merge from "./GIG2Merge.js";
import { DataStructures } from "./BaseUtils.js";

const BORDER_COLOR = "white";
const BORDER_WIDTH = 1;

export default class RegionGroup {
  static async getMapInfoForCustomMap(mapName) {
    const url = `/${APP_NAME}/data/custom_maps/${mapName}.json`;
    const rawInfo = await WWW.json(url);

    const groupToRegions = rawInfo["label_to_region_ids"];
    const groupIndex = Object.keys(groupToRegions).reduce(function (
      groupIndex,
      groupID
    ) {
      groupIndex[groupID] = {
        groupID: groupID,
        name: groupID,
      };
      return groupIndex;
    },
    {});

    return {
      mapID: mapName,
      name: mapName,
      groupIndex,
      groupToRegions,
    };
  }

  static async getMapInfoForRegionType(regionType) {
    const regionEnts = await Ents.getEntsByType(regionType);

    const groupList = regionEnts.map(function (regionEnt) {
      return {
        groupID: regionEnt.id,
        name: regionEnt.name,
      };
    });

    const groupIndex = groupList.reduce(function (groupIndex, group) {
      groupIndex[group.groupID] = group;
      return groupIndex;
    }, {});

    const regionIDs = regionEnts
      .map((regionEnt) => regionEnt.id)
      .filter(function (regionID) {
        return regionType !== ENT.PD || regionID.substring(5) !== "P";
      });

    const groupToRegions = regionIDs.reduce(function (
      groupToRegions,
      regionID
    ) {
      groupToRegions[regionID] = [regionID];
      return groupToRegions;
    },
    {});

    return {
      mapID: "region_type_" + regionType,
      name: "By " + Ents.getEntTypeLongName(regionType),
      groupIndex,
      groupToRegions,
    };
  }

  static async getMapInfoIndex() {
    const forRegionTypes = await DataStructures.buildIndex(
      [ENT.PROVINCE, ENT.DISTRICT, ENT.DSD, ENT.ED, ENT.PD],
      RegionGroup.getMapInfoForRegionType
    );

    const forCustomMaps = await DataStructures.buildIndex(
      ["sl_new_pds.lk-FINAL.compressed"],
      RegionGroup.getMapInfoForCustomMap
    );

    return Object.assign({}, forRegionTypes, forCustomMaps);
  }

  static getGroupTableIndex(groupToRegions, activeTableIndex) {
    const valueKeys = GIG2.getValueKeys(GIG2.getFirstRow(activeTableIndex));

    const rawGroupTableIndex = Object.entries(groupToRegions).reduce(function (
      groupTableIndex,
      [groupID, regionIDs]
    ) {
      groupTableIndex[groupID] = regionIDs.reduce(function (
        groupRow,
        regionID
      ) {
        if (!activeTableIndex[regionID]) {
          return groupRow;
        }
        return Object.entries(activeTableIndex[regionID]).reduce(function (
          groupRow,
          [key, value]
        ) {
          if (valueKeys.includes(key)) {
            if (!groupRow[key]) {
              groupRow[key] = value;
            } else {
              groupRow[key] += value;
            }
          } else {
            groupRow[key] = value;
          }
          return groupRow;
        },
        groupRow);
      },
      {});
      return groupTableIndex;
    },
    {});

    const groupTableIndex =
      GIG2Merge.mergeAndExpandOtherOnTable(rawGroupTableIndex);

    return groupTableIndex;
  }

  static getRegionStyle(groupTableRow) {
    let opacity = 0.1;
    let color = "gray";

    if (!groupTableRow) {
      return {
        fillColor: color,
        fillOpacity: opacity,
        color: BORDER_COLOR,
        weight: BORDER_WIDTH,
      };
    }

    const maxValueKey = GIG2.getMaxValueKey(groupTableRow);
    const maxValueP = GIG2.getValueKeyP(groupTableRow, maxValueKey);

    opacity = maxValueP;
    color = GIG2.getTableRowColor(groupTableRow);

    return {
      fillColor: color,
      fillOpacity: opacity,
      color: BORDER_COLOR,
      weight: BORDER_WIDTH,
    };
  }
}
