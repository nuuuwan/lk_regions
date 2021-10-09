import { Component } from "react";

import GeoMap from "../molecules/GeoMap.js";
import RegionGroups from "../molecules/RegionGroups.js";

const DEFAULT_ZOOM = 10;
const DEFAULT_LATLNG = [6.9157, 79.8636];

const TEST_GROUPS = [
  {
    name: 'Colombo',
    regionIDs: ['LK-11'],
    color: 'darkgreen',
  },
  {
    name: 'Gampaha & Puttalam',
    regionIDs: ['LK-12', 'LK-62'],
    color: 'blue',
  },
  {
    name: 'Kegalle & Kurunegala',
    regionIDs: ['LK-92', 'LK-61'],
    color: 'maroon',
  },
]

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
