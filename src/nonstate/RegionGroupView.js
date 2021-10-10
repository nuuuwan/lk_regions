import RegionView from './RegionView.js';

export default function RegionGroupView(props) {
  const { group, regionToGeo, isActive } = props;

  return (
    <>
      {group.regionIDs.map(function (regionID, iRegion) {
        const geoJSON = {
          type: "MultiPolygon",
          coordinates: regionToGeo[regionID],
        };
        return <RegionView geoJSON={geoJSON} isActive={isActive} />;
      })}
    </>
  );
}
