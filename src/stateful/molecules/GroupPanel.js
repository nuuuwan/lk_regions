import { Component } from "react";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

export default class GroupPanel extends Component {
  render() {
    const {
      showGroupPanel,
      onGroupPanelHide,
      groupIndex,
      activeGroupID,
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
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={groupKeyList}
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
              const isActive = (activeGroupID === groupID);

              function onClickGroupInner() {
                onClickGroup(groupID);
              }

              return (
                <TreeItem
                  key={groupKey}
                  nodeId={groupKey}
                  label={label}
                  onClick={onClickGroupInner}
                >
                  {regionIDs.map(function (regionID, iRegion) {
                    const regionKey = `region-${regionID}`;
                    return (
                      <TreeItem
                        key={regionKey}
                        nodeId={regionKey}
                        label={regionID}
                      />
                    );
                  })}
                </TreeItem>
              );
            })}
          </TreeView>
        </Box>
      </Drawer>
    );
  }
}
