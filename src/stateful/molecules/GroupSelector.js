import { Component } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MapIcon from "@mui/icons-material/Map";

export default class MainPanel extends Component {
  render() {
    const { showGroupSelector, onGroupSelectorHide, mapInfoIndex, onClickMap } =
      this.props;

    return (
      <Drawer
        anchor={"right"}
        open={showGroupSelector}
        onClose={onGroupSelectorHide}
        sx={{ width: 400 }}
      >
        <Paper
          sx={{
            width: 400,
          }}
        >
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List>
              {Object.entries(mapInfoIndex).map(function (
                [mapID, mapInfo],
                iMap
              ) {
                const key = `map-info-${iMap}`;
                const onClickMapInner = function (e) {
                  onClickMap(mapID);
                };
                return (
                  <ListItem key={key} disablePadding onClick={onClickMapInner}>
                    <ListItemButton>
                      <ListItemIcon>
                        <MapIcon />
                      </ListItemIcon>
                      <ListItemText primary={mapInfo.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Paper>
      </Drawer>
    );
  }
}
