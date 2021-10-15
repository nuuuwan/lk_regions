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
  1982, 1988, 1994, 1999, 2005, 2010, 2015, 2019,
];

const PARLIAMENTARY_ELECTION_YEAR_LIST = [
  1989, 1994, 2000, 2001, 2004, 2010, 2015, 2020,
];

export const TABLE_INFO_LIST = [
  {
    getLabel: (config) => "Ethnicity",
    getTableName: (config) => "regions.2012_census.ethnicity_of_population",
    Icon: PeopleAltIcon,
    configList: [1],
  },
  {
    getLabel: (config) => "Religion",
    getTableName: (config) =>
      "regions.2012_census.religious_affiliation_of_population",
    Icon: PeopleAltIcon,
    configList: [1],
  },
  {
    getLabel: (config) => `${config} Presidential Election`,
    getTableName: (config) =>
      `regions_ec.${config}_election_presidential.result`,
    Icon: BallotIcon,
    configList: PRESIDENTIAL_ELECTION_YEAR_LIST,
  },
  {
    getLabel: (config) => `${config} Parliamentary Election`,
    getTableName: (config) =>
      `regions_ec.${config}_election_parliamentary.result`,
    Icon: BallotIcon,
    configList: PARLIAMENTARY_ELECTION_YEAR_LIST,
  },
];

export const TABLE_NAMES = getTableNames();
export const DEFAULT_TABLE_NAME = TABLE_NAMES[0];

function getTableNames() {
  return TABLE_INFO_LIST.reduce(function (tableNames, tableInfo) {
    const { getTableName, configList } = tableInfo;
    return [].concat(
      tableNames,
      configList.map((config) => getTableName(config))
    );
  }, []);
}
