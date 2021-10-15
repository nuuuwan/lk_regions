import Paper from "@mui/material/Paper";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { COLOR_INFO_LIST } from "../../constants/GIG2Constants.js";

export default function ColorPanel(props) {
  const {
    activeMapColorTableName,
    onClickMapColor,
    showDorlingCartogram,
    onClickShowDorlingCartogram,
    onClickHideDorlingCartogram,
  } = props;

  function renderListItem({ label, tableName, Icon }) {
    const selected = activeMapColorTableName === tableName;

    function onClick() {
      onClickMapColor(tableName);
    }

    return (
      <ListItemButton key={label} selected={selected} onClick={onClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    );
  }

  function onChangeDorlingCartogram(e) {
    if (e.target.checked) {
      onClickShowDorlingCartogram();
    } else {
      onClickHideDorlingCartogram();
    }
  }

  return (
    <Paper
      sx={{
        position: "absolute",
        zIndex: 1000,

        left: 20,
        bottom: 20,

        width: 300,
        height: 420,
        overflow: "scroll",
      }}
    >
      <FormGroup sx={{ marginLeft: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showDorlingCartogram}
              onChange={onChangeDorlingCartogram}
            />
          }
          label="Dorling Cartogram"
        />
      </FormGroup>
      <List dense subheader={<ListSubheader>Color Map by</ListSubheader>}>
        {COLOR_INFO_LIST.map(renderListItem)}
      </List>
    </Paper>
  );
}
