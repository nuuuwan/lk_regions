import Ents from "./Ents.js";

export default class RegionGroup {
  static async getGroupIndexForType(regionType) {
    const regionEnts = await Ents.getEntsByType(regionType);
    const groupList = regionEnts.map(function (regionEnt) {
      return {
        groupID: regionEnt.id,
        name: regionEnt.name,
        regionIDs: [regionEnt.id],
      };
    });

    return groupList.reduce(function (groupIndex, group) {
      groupIndex[group.groupID] = group;
      return groupIndex;
    }, {});
  }
}
