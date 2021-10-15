import Paper from "@mui/material/Paper";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BallotIcon from "@mui/icons-material/Ballot";

const PRESIDENTIAL_ELECTION_YEAR_LIST = [
  2019, 2015, 2010, 2005, 1999, 1994, 1988, 1982,
];

const PARLIAMENTARY_ELECTION_YEAR_LIST = [
  1989, 1994, 2000, 2001, 2004, 2010, 2015, 2020,
];

export const COLOR_INFO_LIST = []
  .concat(
    // Presidential Elections
    PRESIDENTIAL_ELECTION_YEAR_LIST.map(function (electionYear) {
      return {
        label: `${electionYear} Presidential Election`,
        tableName: `regions_ec.${electionYear}_election_presidential.result`,
        Icon: BallotIcon,
      };
    }),

    // Parliamentary Elections
    PARLIAMENTARY_ELECTION_YEAR_LIST.map(function (electionYear) {
      return {
        label: `${electionYear} Parliamentary Election`,
        tableName: `regions_ec.${electionYear}_election_parliamentary.result`,
        Icon: BallotIcon,
      };
    }),

    // 2012 Census
    [
      {
        label: "Ethnicity",
        tableName: "regions.2012_census.ethnicity_of_population",
        Icon: PeopleAltIcon,
      },
      {
        label: "Religion",
        tableName: "regions.2012_census.religious_affiliation_of_population",
        Icon: PeopleAltIcon,
      },
    ]
  )
  .sort((a, b) => -a.tableName.localeCompare(b.tableName));

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
      <FormGroup sx={{marginLeft: 2}}>
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
