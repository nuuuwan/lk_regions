import { Component } from "react";
import Card from '@mui/material/Card';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



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
            width: 200,
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
                <Card sx={{m: 2, p: 2, color: group.color}}>
                <Typography variant="overline">
                  {group.name}
                </Typography>
                <Stack spacing={1} sx={{width: 100}}>
                  {regionIDs.map(function (regionID, iRegion) {
                    const regionKey = `region-${regionID}`;
                    return (
                      <Chip
                        key={regionKey}
                        label={regionID}
                      />
                    );
                  })}
                </Stack>
                          </Card>
              );
            })}
        </Box>
      </Drawer>
    );
  }
}
