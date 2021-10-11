import Ents, { ENT } from "./Ents.js";
import { DataStructures } from "./BaseUtils.js";

export default class RegionGroup {
  static async getGroupDataForRegionType(regionType) {
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
      mapID: "by_" + regionType,
      name: "By " + Ents.getEntTypeLongName(regionType),
      groupIndex,
      regionToGroup,
    };
  }

  static async getMapInfoIndex() {
    return await DataStructures.buildIndex(
      [ENT.PROVINCE, ENT.DISTRICT, ENT.DSD, ENT.ED, ENT.PD],
      RegionGroup.getGroupDataForRegionType
    );
  }
}
