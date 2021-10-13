import { Component } from "react";

import * as topojsonClient from "topojson-client";
import * as topojsonServer from "topojson-server";

import { DataStructures } from "../../base/BaseUtils.js";
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
    console.debug(topoJSON);
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
    const { regionIDs, onClickRegion, funcGetRegionStyle } = this.props;

    return (
      <RegionView
        geoJSON={mergedGeoJSON}
        onClickRegion={onClickRegion}
        style={funcGetRegionStyle(regionIDs[0])}
      />
    );
  }
}

export default class MultiRegionView extends Component {
  render() {
    const { regionToGroup, onClickRegion, funcGetRegionStyle } = this.props;

    const groupToRegions = DataStructures.invertDict(regionToGroup);

    return Object.entries(groupToRegions).map(function (
      [groupID, regionIDs],
      iGroup
    ) {
      return (
        <GroupRegionView
          key={`group-${groupID}`}
          regionIDs={regionIDs}
          onClickRegion={onClickRegion}
          funcGetRegionStyle={funcGetRegionStyle}
        />
      );
    });
  }
}
