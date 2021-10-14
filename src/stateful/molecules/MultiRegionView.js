import { Component } from "react";

import * as topojsonClient from "topojson-client";
import * as topojsonServer from "topojson-server";
import * as topojsonSimplify from "topojson-simplify";

import { LRUCache } from "../../base/BaseUtils.js";

import GeoData from "../../base/GeoData.js";
import RegionView from "../atoms/RegionView.js";

const CACHE_VERSION = "v5";
const SIMPLIFY_WEIGHT = 0.0000001;

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
  render() {
    const { style, pop, geoJSON } = this.props;

    return <RegionView geoJSON={geoJSON} style={style} pop={pop} />;
  }
}

export default class MultiRegionView extends Component {

  constructor(props) {
    super(props);
    this.state = { groupGeoJSONList: null };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { groupToRegions } = this.props;

    const groupGeoJSONList = await Promise.all(
      Object.entries(groupToRegions).map(
        async function([groupID, regionIDs]) {
          return await getGroupGeoJSON(regionIDs);
        },
      )
    )

    if (this.isComponentMounted) {
      this.setState({ groupGeoJSONList });
    }
  }

  render() {
    const {groupGeoJSONList} = this.state;

    if (!groupGeoJSONList) {
      return null;
    }

    const { groupToRegions, funcGetRegionStyle, funcGetRegionPop } = this.props;


    return Object.entries(groupToRegions).map(function (
      [groupID, regionIDs],
      iGroup
    ) {
      return (
        <GroupRegionView
          key={`group-${groupID}`}
          geoJSON={groupGeoJSONList[iGroup]}
          style={funcGetRegionStyle(groupID)}
          pop={funcGetRegionPop(groupID)}
        />
      );
    });
  }
}
