import Ents, { ENT } from "./Ents.js";

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
    const mapInfoList = await Promise.all(
      [ENT.PROVINCE, ENT.DISTRICT, ENT.DSD, ENT.ED, ENT.PD].map(async function (
        regionType
      ) {
        return await RegionGroup.getGroupDataForRegionType(regionType);
      })
    );
    return mapInfoList.reduce(function (mapInfoIndex, mapInfo) {
      mapInfoIndex[mapInfo.mapID] = mapInfo;
      return mapInfoIndex;
    }, {});
  }
}
