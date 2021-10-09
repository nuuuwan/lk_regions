import { GeoJSON } from "react-leaflet";
import * as topojsonClient from "topojson-client";
import * as topojsonServer from "topojson-server";

export default function RegionGroup(props) {
  const { group, regionToGeo } = props;

  const geoJSONList = group.regionIDs.map(function (regionID) {
    return {
      type: "MultiPolygon",
      coordinates: regionToGeo[regionID],
    };
  });

  const topoJSON = topojsonServer.topology(geoJSONList);
  const mergedTopoJSON = topojsonClient.merge(
    topoJSON,
    Object.values(topoJSON.objects)
  );

  const style = {
    color: "black",
    fillColor: group.color,
    fillOpacity: 0.3,
    weight: 5,
  };

  return <GeoJSON data={mergedTopoJSON} style={style} />;
}
