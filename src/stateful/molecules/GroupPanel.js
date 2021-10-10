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
import {COLOR_ACTIVE, COLOR_NOT_ACTIVE} from '../../constants/ColorConstants.js';

export default class GroupPanel extends Component {
  render() {
    const {
      showGroupPanel,
      onGroupPanelHide,
      groupIndex,
      regionToGroup,
      onClickGroup,
      activeGroupID,
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
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 0,
            width: 300,
            height: 300,
            m: 2,
            zIndex: 1000,
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

              const color = (activeGroupID === groupID) ? COLOR_ACTIVE: COLOR_NOT_ACTIVE;


              return (
                <Card sx={{m: 1, p: 1}} onClick={onClickGroupInner}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <CircleIcon sx={{color}} fontSize="smallest"/>
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
    );
  }
}
