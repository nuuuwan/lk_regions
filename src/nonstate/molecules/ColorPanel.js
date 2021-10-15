import Paper from "@mui/material/Paper";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { COLOR_INFO_LIST } from "../../constants/GIG2Constants.js";

const STYLE = {
  position: "absolute",
  zIndex: 1000,

  left: 20,
  bottom: 20,

  width: 300,
  height: 420,
  overflow: "scroll",
};

function DorlingCartogramSelector(props) {
  const { showDorlingCartogram, onChangeDorlingCartogram } = props;
  return (
    <FormGroup sx={{ marginLeft: 2 }}>
      <FormControlLabel
        label={<Typography variant="caption">Dorling Cartogram</Typography>}
        disableTypography
        control={
          <Switch
            checked={showDorlingCartogram}
            onChange={onChangeDorlingCartogram}
          />
        }
      />
    </FormGroup>
  );
}

function ColorPanelListItem(props) {
  const { label, tableName, Icon, activeMapColorTableName, onClickMapColor } =
    props;
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

export default function ColorPanel(props) {
  const {
    activeMapColorTableName,
    onClickMapColor,
    showDorlingCartogram,
    onClickShowDorlingCartogram,
    onClickHideDorlingCartogram,
  } = props;

  function onChangeDorlingCartogram(e) {
    e.target.checked
      ? onClickShowDorlingCartogram()
      : onClickHideDorlingCartogram();
  }

  return (
    <Paper sx={STYLE}>
      <DorlingCartogramSelector
        showDorlingCartogram={showDorlingCartogram}
        onChangeDorlingCartogram={onChangeDorlingCartogram}
      />

      <List dense subheader={<ListSubheader>Color Map by</ListSubheader>}>
        {COLOR_INFO_LIST.map(function (colorInfo) {
          const { label, tableName, Icon } = colorInfo;
          return (
            <ColorPanelListItem
              label={label}
              tableName={tableName}
              Icon={Icon}
              activeMapColorTableName={activeMapColorTableName}
              onClickMapColor={onClickMapColor}
            />
          );
        })}
      </List>
    </Paper>
  );
}
