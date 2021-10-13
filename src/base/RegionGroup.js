import { WWW } from "@nuuuwan/utils-js-dev";

import { APP_NAME } from "../constants/Constants.js";
import Ents, { ENT } from "./Ents.js";
import { DataStructures } from "./BaseUtils.js";

export default class RegionGroup {
  static async getMapInfoForCustomMap(mapName) {
    const url = `/${APP_NAME}/data/custom_maps/${mapName}.json`;
    const rawInfo = await WWW.json(url);

    const groupNameToRegionIDs = rawInfo["label_to_region_ids"];
    const groupIndex = Object.keys(groupNameToRegionIDs).reduce(function (
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

    const regionToGroup = Object.entries(groupNameToRegionIDs).reduce(function (
      regionToGroup,
      [groupID, regionIDs]
    ) {
      return regionIDs.reduce(function (regionToGroup, regionID) {
        regionToGroup[regionID] = groupID;
        return regionToGroup;
      }, regionToGroup);
    },
    {});

    return {
      mapID: "custom_" + mapName,
      name: mapName,
      groupIndex,
      regionToGroup,
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

    const regionToGroup = regionIDs.reduce(function (regionToGroup, regionID) {
      regionToGroup[regionID] = regionID;
      return regionToGroup;
    }, {});

    return {
      mapID: "region_type_" + regionType,
      name: "By " + Ents.getEntTypeLongName(regionType),
      groupIndex,
      regionToGroup,
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
}
