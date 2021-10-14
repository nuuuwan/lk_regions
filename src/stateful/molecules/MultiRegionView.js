import { Component } from "react";

import * as topojsonClient from "topojson-client";
import * as topojsonServer from "topojson-server";
import * as topojsonSimplify from "topojson-simplify";
import * as d3 from "d3";

import { LRUCache } from "../../base/BaseUtils.js";

import GeoData from "../../base/GeoData.js";
import RegionView from "../atoms/RegionView.js";

const CACHE_VERSION = "v5";
const SIMPLIFY_WEIGHT = 0.0000001;

function getRadiusFromPop(pop) {
  return Math.sqrt(pop) * 25;
}
const RADIUS_TO_GEO_UNITS = 0.00001015;

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
      Object.entries(groupToRegions).map(async function ([groupID, regionIDs]) {
        return await getGroupGeoJSON(regionIDs);
      })
    );

    if (this.isComponentMounted) {
      this.setState({ groupGeoJSONList });
    }
  }

  render() {
    const { groupGeoJSONList } = this.state;

    if (!groupGeoJSONList) {
      return null;
    }

    const { groupToRegions, funcGetRegionStyle, funcGetRegionPop } = this.props;

    const groupIDs = Object.keys(groupToRegions);

    const simulation = d3
      .forceSimulation(groupGeoJSONList)
      .force(
        "x",
        d3.forceX((d) => d3.geoCentroid(d)[1])
      )
      .force(
        "y",
        d3.forceY((d) => d3.geoCentroid(d)[0])
      )
      .force(
        "collide",
        d3.forceCollide(
          (d, i) =>
            RADIUS_TO_GEO_UNITS *
            getRadiusFromPop(funcGetRegionPop(groupIDs[i]))
        )
      )
      .stop();

    for (let i = 0; i < 1000; i++) {
      simulation.tick();
    }

    const nodes = simulation.nodes();

    return Object.entries(groupToRegions).map(function (
      [groupID, regionIDs],
      iGroup
    ) {
      const pop = funcGetRegionPop(groupID);
      const radius = getRadiusFromPop(pop);
      return (
        <RegionView
          key={`group-${groupID}`}
          geoJSON={groupGeoJSONList[iGroup]}
          center={[nodes[iGroup].x, nodes[iGroup].y]}
          style={funcGetRegionStyle(groupID)}
          radius={radius}
        />
      );
    });
  }
}
