import Region from './Region.js';

export default function RegionGroup(props) {
  const {group, regionToGeo} = props;

  return (
    <>
      {
        group.regionIDs.map(
          function(regionID, iRegion) {
            const geoJsonData = {
              type: "MultiPolygon",
              coordinates: regionToGeo[regionID],
            };
            const key = `group-region-${iRegion}`;

            return (
              <Region key={key} regionID={regionID} geoJsonData={geoJsonData} color={group.color} />
            )
          }
        )
      }
    </>
  );
}
