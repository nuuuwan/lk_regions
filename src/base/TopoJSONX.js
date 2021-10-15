import * as topojsonClient from "topojson-client";
import * as topojsonServer from "topojson-server";
import * as topojsonSimplify from "topojson-simplify";

import { LRUCache } from "./BaseUtils.js";

import GeoData from "./GeoData.js";

const CACHE_VERSION = "v5";
const SIMPLIFY_WEIGHT = 0.0000001;

export const DEFAULT_ZOOM = 8;
export const DEFAULT_LATLNG = [7.836173, 80.403442];

export default class TopoJSONX {
  static async getGroupGeoJSONNoCache(regionIDs) {
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

  static async getGroupGeoJSON(regionIDs) {
    const cacheKey = regionIDs.join(":") + CACHE_VERSION;
    return await LRUCache.get(cacheKey, async function () {
      return await TopoJSONX.getGroupGeoJSONNoCache(regionIDs);
    });
  }
}
