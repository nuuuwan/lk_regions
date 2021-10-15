import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BallotIcon from "@mui/icons-material/Ballot";

export const ID_FIELD_KEY = "entity_id";
export const OTHER_LIMIT_GLOBAL = 0.01;
export const OTHER_LIMIT_LOCAL = 0.2;
export const KEY_OTHER = "other";

export const MERGE_ALIAS_MAP = {
  moor: "muslim",
  malay: "muslim",
  sri_lankan_tamil: "tamil",
  indian_tamil: "tamil",
  roman_catholic: "christian",
  other_christian: "christian",
};

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

export const TABLE_NAMES = COLOR_INFO_LIST.map((d) => d.tableName);
export const DEFAULT_TABLE_NAME = TABLE_NAMES[0];
