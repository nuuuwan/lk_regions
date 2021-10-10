import { Component } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

export default class GroupPanel extends Component {
  render() {
    const { showGroupPanel, onGroupPanelHide, groupIndex, regionToGroup } =
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
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
            {Object.entries(groupIndex).map(function (
              [groupID, group],
              iGroup
            ) {
              const label = group.name;
              const regionIDs = groupToRegion[groupID];
              const groupKey = `group-${groupID}`;
              return (
                <TreeItem key={groupKey} nodeID={groupKey} label={label}>
                  {regionIDs.map(function (regionID, iRegion) {
                    const regionKey = `region-${regionID}`;
                    return (
                      <TreeItem
                        key={regionKey}
                        nodeID={regionKey}
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
