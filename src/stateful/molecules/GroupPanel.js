import { Component } from "react";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

export default class GroupPanel extends Component {
  render() {
    const {
      showGroupPanel,
      onGroupPanelShow,
      onGroupPanelHide,
      groupIndex,
      regionIndex,
    } = this.props;
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
              return <TreeItem nodeId="1" label={label} />;
            })}
          </TreeView>
        </Box>
      </Drawer>
    );
  }
}
