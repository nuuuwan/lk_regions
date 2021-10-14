import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";

import { DataStructures } from "../../base/BaseUtils.js";
import RegionChip from "../../stateful/atoms/RegionChip.js";

import {
  COLOR_ACTIVE,
  COLOR_NOT_ACTIVE,
} from "../../constants/ColorConstants.js";

export default function PartitionsTabContent(props) {
  const { groupIndex, groupToRegions, activeGroupID } = props;

  return (
    <Box>
      {Object.entries(groupIndex).map(function ([groupID, group], iGroup) {
        let regionIDs = groupToRegion[groupID];
        if (!regionIDs) {
          regionIDs = [];
        }

        const color =
          activeGroupID === groupID ? COLOR_ACTIVE : COLOR_NOT_ACTIVE;

        const groupKey = `group-${groupID}`;
        return (
          <Box key={groupKey}>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography variant="overline">{group.name}</Typography>
              </Grid>
              <Grid item>
                <CircleIcon sx={{ color }} fontSize="smallest" />
              </Grid>
            </Grid>

            <Box sx={{ paddingBottom: 2 }}>
              {regionIDs.map(function (regionID, iRegion) {
                const regionKey = `region-${regionID}`;
                return <RegionChip key={regionKey} regionID={regionID} />;
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
