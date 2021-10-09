import { Component } from "react";

import GeoMap from "../molecules/GeoMap.js";
import RegionGeo from "../molecules/RegionGeo.js";

const DEFAULT_ZOOM = 10;
const DEFAULT_LATLNG = [6.9157, 79.8636];

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <GeoMap center={DEFAULT_LATLNG} zoom={DEFAULT_ZOOM}>
          <RegionGeo regionID="LK-11" />
        </GeoMap>
      </div>
    );
  }
}
