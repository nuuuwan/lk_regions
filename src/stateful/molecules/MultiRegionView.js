import { Component } from "react";

import * as topojsonClient from "topojson-client";
import * as topojsonServer from "topojson-server";

import GeoData from "../../base/GeoData.js";
import RegionView from "../atoms/RegionView.js";

class GroupRegionView extends Component {
  constructor(props) {
    super(props);
    this.state = { mergedGeoJSON: null };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { regionIDs } = this.props;

    const geoJSON = await Promise.all(
      regionIDs.map(async function (regionID) {
        return {
          type: "MultiPolygon",
          coordinates: await GeoData.getCoordinatesForRegion(regionID),
        };
      })
    );

    const topoJSON = topojsonServer.topology(geoJSON);
    const mergedGeoJSON = topojsonClient.merge(
      topoJSON,
      Object.values(topoJSON.objects)
    );

    if (this.isComponentMounted) {
      this.setState({ mergedGeoJSON });
    }
  }

  render() {
    const { mergedGeoJSON } = this.state;
    if (!mergedGeoJSON) {
      return null;
    }
    const { style } = this.props;

    return <RegionView geoJSON={mergedGeoJSON} style={style} />;
  }
}

export default class MultiRegionView extends Component {
  render() {
    const { groupToRegions, funcGetRegionStyle } = this.props;

    return Object.entries(groupToRegions).map(function (
      [groupID, regionIDs],
      iGroup
    ) {
      return (
        <GroupRegionView
          key={`group-${groupID}`}
          regionIDs={regionIDs}
          style={funcGetRegionStyle(groupID)}
        />
      );
    });
  }
}
