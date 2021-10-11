import { Component } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RegionChip from "../atoms/RegionChip.js";
import CircleIcon from "@mui/icons-material/Circle";
import Divider from "@mui/material/Divider";

import {
  COLOR_ACTIVE,
  COLOR_NOT_ACTIVE,
} from "../../constants/ColorConstants.js";

export default class GroupPanel extends Component {
  render() {
    const { groupIndex, regionToGroup, onClickGroup, activeGroupID } =
      this.props;

    const groupToRegion = Object.entries(regionToGroup).reduce(function (
      groupToRegion,
      [regionID, groupID]
    ) {
      if (groupID) {
        if (!groupToRegion[groupID]) {
          groupToRegion[groupID] = [];
        }
        groupToRegion[groupID].push(regionID);
      }
      return groupToRegion;
    },
    {});

    return (
      <Paper
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 400,
          height: "70vh",
          m: 2,
          p: 2,
          zIndex: 1000,
          overflow: "scroll",
        }}
      >
        {Object.entries(groupIndex).map(function ([groupID, group], iGroup) {
          let regionIDs = groupToRegion[groupID];
          if (!regionIDs) {
            regionIDs = [];
          }
          function onClickGroupInner() {
            onClickGroup(groupID);
          }

          const color =
            activeGroupID === groupID ? COLOR_ACTIVE : COLOR_NOT_ACTIVE;

          const groupKey = `group-${groupID}`;
          return (
            <Box key={groupKey} sx={{ m: 1, p: 1 }} onClick={onClickGroupInner}>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <CircleIcon sx={{ color }} fontSize="smallest" />
                </Grid>
                <Grid item>
                  <Typography variant="overline" sx={{ paddingLeft: 1 }}>
                    {group.name}
                  </Typography>
                </Grid>
              </Grid>

              <Box>
                {regionIDs.map(function (regionID, iRegion) {
                  const regionKey = `region-${regionID}`;
                  return <RegionChip key={regionKey} regionID={regionID} />;
                })}
              </Box>
              <Divider />
            </Box>
          );
        })}
      </Paper>
    );
  }
}
