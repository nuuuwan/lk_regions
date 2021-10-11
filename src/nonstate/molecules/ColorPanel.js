import Paper from "@mui/material/Paper";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BallotIcon from '@mui/icons-material/Ballot';

const COLOR_INFO_LIST = [
  {
    label: 'Ethnicity',
    tableName: 'regions.2012_census.ethnicity_of_population',
    Icon: PeopleAltIcon,
  },
  {
    label: 'Religion',
    tableName: 'regions.2012_census.religious_affiliation_of_population',
    Icon: PeopleAltIcon,
  },
  {
    label: '2019 Presidential Election',
    tableName: 'regions_ec.2019_election_presidential.result',
    Icon: BallotIcon,
  }
]

function renderListItem({label, tableName, Icon}) {
  return (
    <ListItemButton key={label}>
      <ListItemIcon>
        <Icon/>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

export default function ColorPanel(props) {
  return (
    <Paper
      sx={{
        position: "absolute",
        zIndex: 1000,

        left: 10,
        bottom: 10,
        width: 300,
        height: 300,

        m: 1,
        p: 1,
      }}
    >
      <List
        subheader={
          <ListSubheader>
            Color Map by
          </ListSubheader>
        }
      >
        {
          COLOR_INFO_LIST.map(renderListItem)
        }
      </List>
    </Paper>
  );
}
