import { Color } from "@nuuuwan/utils-js-dev";
import Ents from "./Ents.js";

export default class RegionGroup {
  static async getGroupDataForRegionType(regionType) {
    const regionEnts = await Ents.getEntsByType(regionType);
    const groupList = regionEnts.map(function (regionEnt) {
      return {
        groupID: regionEnt.id,
        name: regionEnt.name,
        color: Color.getRandomHSLA(),
      };
    });

    const groupIndex = groupList.reduce(function (groupIndex, group) {
      groupIndex[group.groupID] = group;
      return groupIndex;
    }, {});

    const regionIDs = regionEnts.map((regionEnt) => regionEnt.id);
    const regionToGroup = regionIDs.reduce(function (regionToGroup, regionID) {
      regionToGroup[regionID] = regionID;
      return regionToGroup;
    }, {});

    return [groupIndex, regionToGroup];
  }
}
