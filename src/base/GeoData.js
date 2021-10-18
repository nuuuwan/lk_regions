import { WWW } from "@nuuuwan/utils-js-dev";

import Ents, { REGION_TYPES } from "./Ents.js";
import { APP_NAME } from "../constants/Constants.js";

export const DEFAULT_ZOOM = 8;
export const DEFAULT_LATLNG = [7.836173, 80.403442];

export function getDefaultLatLngZoomStr() {
  return getLatLngZoomStr(DEFAULT_LATLNG, DEFAULT_ZOOM);
}

export function getLatLngZoomStr([lat, lng], zoom) {
  return `${lat}N,${lng}E,${zoom}z`;
}

export function parseLatLngZoomStr(locationStr) {
  const [latStr, lngStr, zoomStr] = locationStr.split(",");
  const lat = parseFloat(latStr.replace("N", ""));
  const lng = parseFloat(lngStr.replace("E", ""));
  const zoom = parseInt(zoomStr.replace("z", ""));
  return { lat, lng, zoom };
}

export function getBrowserLatLng(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      callback([position.coords.latitude, position.coords.longitude]);
    });
  } else {
    callback(DEFAULT_LATLNG);
  }
}

function isPointInPolygon(point, polygon) {
  const [y, x] = point;
  let nIntersects = 0;
  for (let i in polygon) {
    const j = (i - 1 + polygon.length) % polygon.length;

    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    // eslint-disable-next-line no-mixed-operators
    const a = yi > y !== yj > y;
    // eslint-disable-next-line no-mixed-operators
    const b = x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    const intersect = a && b;
    if (intersect) {
      nIntersects += 1;
    }
  }
  return nIntersects % 2 === 1;
}

function isPointInMultiMultiPolygon(point, multiMultiPolygon) {
  for (let i in multiMultiPolygon) {
    const multiPolygon = multiMultiPolygon[i];
    for (let j in multiPolygon) {
      const polygon = multiPolygon[j];
      if (isPointInPolygon(point, polygon)) {
        return true;
      }
    }
  }
  return false;
}

export default class GeoData {
  static async getCoordinatesForRegion(regionID) {
    const regionType = Ents.getEntType(regionID);
    const url = `/${APP_NAME}/data/gig-data/geo/${regionType}/${regionID}.json`;
    const coordinates = await WWW.json(url);
    return coordinates;
  }

  static async getRegionToGeo(regionIDs) {
    const geoDataList = await Promise.all(
      regionIDs.map(async function (regionID) {
        return await GeoData.getCoordinatesForRegion(regionID);
      })
    );

    return regionIDs.reduce(function (regionToGeo, regionID, iRegion) {
      regionToGeo[regionID] = geoDataList[iRegion];
      return regionToGeo;
    }, {});
  }

  static async isPointInRegion(point, regionID) {
    const multiPolygon = await GeoData.getCoordinatesForRegion(regionID);
    return isPointInMultiMultiPolygon(point, multiPolygon);
  }

  static async getRegionsForPoint(point) {
    let regionTree = await GeoData.getRegionTree();

    let regionMap = {};

    for (let iRegionType in REGION_TYPES) {
      const regionType = REGION_TYPES[iRegionType];
      const regionIDs = Object.keys(regionTree);
      let isFoundRegion = false;
      for (let iRegion in regionIDs) {
        const regionID = regionIDs[iRegion];
        const _isPointInRegion = await GeoData.isPointInRegion(point, regionID);
        if (_isPointInRegion) {
          regionMap[regionType] = regionID;
          regionTree = regionTree[regionID];
          isFoundRegion = true;
        }
      }
      if (!isFoundRegion) {
        break;
      }
    }
    return regionMap;
  }
}

export function roundLatLng(latLng) {
  const Q = 1000_000;
  return latLng.map((x) => Math.round(parseFloat(x) * Q) / Q);
}
