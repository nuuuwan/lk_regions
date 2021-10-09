import { Component } from "react";

import GeoMap from "../molecules/GeoMap.js";
import RegionGroups from "../molecules/RegionGroups.js";

const DEFAULT_ZOOM = 10;
const DEFAULT_LATLNG = [6.9157, 79.8636];

const TEST_GROUPS = [

  {
    name: "Northern",
    regionIDs: ["LK-4"],
    color: "orange",
  },

  {
    name: "Southern",
    regionIDs: ["LK-3"],
    color: "maroon",
  },
  {
    name: "Eastern",
    regionIDs: ["LK-5"],
    color: "green",
  },
  {
    name: "Western",
    regionIDs: ["LK-1", "LK-6"],
    color: "blue",
  },
  {
    name: "Central",
    regionIDs: ["LK-2", 'LK-8', 'LK-7', 'LK-9'],
    color: "pink",
  },

];

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <RegionGroups groups={TEST_GROUPS} />
        </GeoMap>
      </div>
    );
  }
}
