import { Component } from "react";
import Card from '@mui/material/Card';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RegionChip from '../atoms/RegionChip.js';
import CircleIcon from '@mui/icons-material/Circle';


export default class GroupPanel extends Component {
  render() {
    const {
      showGroupPanel,
      onGroupPanelHide,
      groupIndex,
      regionToGroup,
      onClickGroup,
    } = this.props;

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

    const groupKeyList = Object.keys(groupIndex).map(
      (groupID) => `group-${groupID}`
    );

    return (
      <Drawer anchor="right" open={showGroupPanel} onClose={onGroupPanelHide}>
        <Box
          sx={{
            width: 300,
            m: 2,
          }}
        >
            {Object.entries(groupIndex).map(function (
              [groupID, group],
              iGroup
            ) {
              const label = group.name;
              let regionIDs = groupToRegion[groupID];
              if (!regionIDs) {
                regionIDs = [];
              }
              const groupKey = `group-${groupID}`;

              function onClickGroupInner() {
                onClickGroup(groupID);
              }

              return (
                <Card sx={{m: 1, p: 1}}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <CircleIcon sx={{color: group.color}}/>
                    </Grid>
                    <Grid item>
                      <Typography variant="overline" sx={{paddingLeft:1}}>
                        {group.name}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box>
                    {regionIDs.map(function (regionID, iRegion) {
                      const regionKey = `region-${regionID}`;
                      return (
                        <RegionChip key={regionKey} regionID={regionID}/>
                      );
                    })}
                  </Box>
                </Card>
              );
            })}
        </Box>
      </Drawer>
    );
  }
}
