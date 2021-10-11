import RegionView from "../../nonstate/molecules/RegionView.js";

export default function MultiRegionView(props) {
  const { regionToGroup, activeGroupID, regionToGeo, onClickRegion } = props;

  return Object.entries(regionToGroup).map(
    function ([regionID, groupID], iRegion) {
      const geoJSON = {
        type: "MultiPolygon",
        coordinates: regionToGeo[regionID],
      };
      let color;
      if (activeGroupID === groupID) {
        color = "red";
      } else if (groupID) {
        color = "pink";
      } else {
        color = "lightgray";
      }

      const key = `region-${iRegion}-${regionID}`;
      return (
        <RegionView
          key={key}
          regionID={regionID}
          geoJSON={geoJSON}
          color={color}
          onClickRegion={onClickRegion}
        />
      );
    }
  );
}
