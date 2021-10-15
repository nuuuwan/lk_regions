import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { TABLE_INFO_LIST } from "../../constants/GIG2Constants.js";

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
  const onOrOff = showDorlingCartogram ? "ON" : "OFF";
  const label = `Dorling Cartogram (${onOrOff})`;
  return (
    <FormGroup sx={{ marginLeft: 2 }}>
      <FormControlLabel
        label={<Typography variant="caption">{label}</Typography>}
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
  const { tableInfo, activeMapColorTableName, onClickMapColor } = props;
  const { getLabel, getTableName, configList, Icon } = tableInfo;
  const configDefault = configList[configList.length - 1];
  const marks = configList.map((config) => ({ value: config }));

  function getClosestValue(value) {
    const i = marks.findIndex((mark) => mark.value >= value);
    return marks[i].value;
  }

  function onClick() {
    const tableName = getTableName(configDefault);
    onClickMapColor(tableName);
  }

  function onChange(e) {
    const closestValue = getClosestValue(e.target.value);
    const selectedTableName = getTableName(closestValue);
    onClickMapColor(selectedTableName);
  }

  let selected = false;
  let selectedConfig = configDefault;
  for (let config of configList) {
    const tableName = getTableName(config);
    if (tableName === activeMapColorTableName) {
      selected = true;
      selectedConfig = config;
      break;
    }
  }
  const label = getLabel(selectedConfig);
  const displaySlider = configList.length > 1;

  return (
    <Box>
      <ListItemButton key={label} selected={selected} onClick={onClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
      {displaySlider ? (
        <Slider
          valueLabelDisplay="auto"
          disabled={!selected}
          marks={marks}
          value={selectedConfig}
          min={configList[0]}
          max={configDefault}
          valueLabelFormat={getClosestValue}
          onChange={onChange}
          sx={{
            marginLeft: "10%",
            marginRight: "10%",
            width: "80%",
            color: "black",
          }}
        />
      ) : null}
    </Box>
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
        {TABLE_INFO_LIST.map(function (tableInfo, iTable) {
          return (
            <ColorPanelListItem
              key={"list-item-" + iTable}
              tableInfo={tableInfo}
              activeMapColorTableName={activeMapColorTableName}
              onClickMapColor={onClickMapColor}
            />
          );
        })}
      </List>
    </Paper>
  );
}
