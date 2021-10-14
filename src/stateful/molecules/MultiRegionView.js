import { Component } from "react";

import * as topojsonClient from "topojson-client";
import * as topojsonServer from "topojson-server";
import * as topojsonSimplify from "topojson-simplify";

import { LRUCache } from "../../base/BaseUtils.js";

import GeoData from "../../base/GeoData.js";
import RegionView from "../atoms/RegionView.js";

const CACHE_VERSION = "v4";
const SIMPLIFY_WEIGHT = 0.000001;

async function getGroupGeoJSONNoCache(regionIDs) {
  const geoJSON = await Promise.all(
    regionIDs.map(async function (regionID) {
      return {
        type: "MultiPolygon",
        coordinates: await GeoData.getCoordinatesForRegion(regionID),
      };
    })
  );

  let topoJSON = topojsonServer.topology(geoJSON);
  if (SIMPLIFY_WEIGHT) {
    topoJSON = topojsonSimplify.presimplify(topoJSON);
    topoJSON = topojsonSimplify.simplify(topoJSON, SIMPLIFY_WEIGHT);
  }

  const mergedGeoJSON = topojsonClient.merge(
    topoJSON,
    Object.values(topoJSON.objects)
  );
  return mergedGeoJSON;
}

async function getGroupGeoJSON(regionIDs) {
  const cacheKey = regionIDs.join(":") + CACHE_VERSION;
  return await LRUCache.get(cacheKey, async function () {
    return await getGroupGeoJSONNoCache(regionIDs);
  });
}

class GroupRegionView extends Component {
  constructor(props) {
    super(props);
    this.state = { mergedGeoJSON: null };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { regionIDs } = this.props;
    const mergedGeoJSON = await getGroupGeoJSON(regionIDs);

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
