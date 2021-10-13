import { DataStructures } from "../../base/BaseUtils.js";
import RegionView from "../../stateful/atoms/RegionView.js";

export default function MultiRegionView(props) {
  const { regionToGroup, onClickRegion, funcGetRegionStyle } = props;

  const groupToRegions = DataStructures.invertDict(regionToGroup);

  return Object.entries(groupToRegions).map(function (
    [groupID, regionIDs],
    iGroup
  ) {
    return regionIDs.map(function (regionID, iRegion) {
      const key = `region-${regionID}`;
      return (
        <RegionView
          key={key}
          regionID={regionID}
          onClickRegion={onClickRegion}
          style={funcGetRegionStyle(regionID)}
        />
      );
    });
  });

  // return Object.entries(regionToGroup).map(function (
  //   [regionID, groupID],
  //   iRegion
  // ) {
  //   const key = `region-${regionID}`;
  //   return (
  //     <RegionView
  //       key={key}
  //       regionID={regionID}
  //       onClickRegion={onClickRegion}
  //       style={funcGetRegionStyle(regionID)}
  //     />
  //   );
  // });
}
