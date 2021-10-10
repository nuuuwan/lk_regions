import RegionView from "./RegionView.js";

export default function RegionGroupView(props) {
  const { group, regionToGeo, isActive, onClickRegion } = props;

  return (
    <>
      {group.regionIDs.map(function (regionID, iRegion) {
        const geoJSON = {
          type: "MultiPolygon",
          coordinates: regionToGeo[regionID],
        };
        const key = `region-${iRegion}-${regionID}`;
        return (
          <RegionView
            key={key}
            regionID={regionID}
            geoJSON={geoJSON}
            isActive={isActive}
            onClickRegion={onClickRegion}
          />
        );
      })}
    </>
  );
}
