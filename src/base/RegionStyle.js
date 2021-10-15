import GIG2 from "./GIG2.js";

const BORDER_COLOR = "white";
const BORDER_WIDTH = 1;

export default class RegionStyle {
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
