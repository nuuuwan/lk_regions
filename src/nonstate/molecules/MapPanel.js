import Paper from "@mui/material/Paper";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MapIcon from "@mui/icons-material/Map";

import Ents, { ENT } from "../../base/Ents.js";

const REGION_TYPE_LIST = [ENT.PROVINCE, ENT.DISTRICT, ENT.DSD, ENT.ED, ENT.PD];

export default function MapPanel(props) {
  const { activeMapID, onClickMap } = props;

  function renderListItem(mapID) {
    const selected = activeMapID === mapID;

    function onClick() {
      onClickMap(mapID);
    }

    return (
      <ListItemButton key={mapID} selected={selected} onClick={onClick}>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary={Ents.getEntTypeLongName(mapID)} />
      </ListItemButton>
    );
  }

  return (
    <Paper
      sx={{
        position: "absolute",
        zIndex: 1000,

        left: 20,
        top: 20,
        width: 200,
        height: 300,
      }}
    >
      <List dense subheader={<ListSubheader>Split Regions by</ListSubheader>}>
        {REGION_TYPE_LIST.map(renderListItem)}
      </List>
    </Paper>
  );
}
