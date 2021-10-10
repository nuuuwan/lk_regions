import Ents from "./Ents.js";

export default class RegionGroup {
  static async getGroupsByType(regionType) {
    const regionEnts = await Ents.getEntsByType(regionType);
    return regionEnts.map(function (regionEnt) {
      return {
        groupID: regionEnt.id,
        name: regionEnt.name,
        regionIDs: [regionEnt.id],
      };
    });
  }
}
