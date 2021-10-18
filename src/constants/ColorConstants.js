export const COLOR_ACTIVE = "red";
export const COLOR_NOT_ACTIVE = "white";

export const COLOR_SL_FLAG = {
  SINHALA: "hsl(355, 63%, 34%)",
  TAMIL: "hsl(21, 100%, 50%)",
  TAMIL_REDDER: "hsl(5, 100%, 50%)",
  TAMIL_YELLOW: "hsl(60, 100%, 50%)",

  MUSLIM: "hsl(165, 100%, 17%)",
  BUDDHIST: "hsl(43, 100%, 50%)",
};

export const COLOR_POLITICAL = {
  SLFP: "blue",
  UNP: "green",
  JVP: "red",
};

export const FIELD_NAME_TO_COLOR = {
  // political parties
  SLFP: COLOR_POLITICAL.SLFP,
  PA: COLOR_POLITICAL.SLFP,
  UPFA: COLOR_POLITICAL.SLFP,

  SLPP: COLOR_SL_FLAG.SINHALA,

  UNP: COLOR_POLITICAL.UNP,
  NDF: COLOR_POLITICAL.UNP,
  SJB: COLOR_POLITICAL.UNP,

  JVP: COLOR_POLITICAL.JVP,
  JJB: COLOR_POLITICAL.JVP,
  LSSP: COLOR_POLITICAL.JVP,
  TMVP: COLOR_POLITICAL.JVP,

  MNA: COLOR_SL_FLAG.MUSLIM,
  SLMC: COLOR_SL_FLAG.MUSLIM,

  EPDP: COLOR_SL_FLAG.TAMIL_REDDER,
  TULF: COLOR_SL_FLAG.TAMIL,
  ACTC: COLOR_SL_FLAG.TAMIL_YELLOW,
  ITAK: COLOR_SL_FLAG.TAMIL_YELLOW,
  AITC: COLOR_SL_FLAG.TAMIL_REDDER,

  SLMP: "purple",

  other: "gray",
  others: "gray",

  // ethnicity_of_population
  bharatha: "cyan",
  burgher: "purple",
  chetty: COLOR_SL_FLAG.BLUE,
  ind_tamil: COLOR_SL_FLAG.TAMIL,
  tamil: COLOR_SL_FLAG.TAMIL,
  malay: COLOR_SL_FLAG.MUSLIM,
  moor: COLOR_SL_FLAG.MUSLIM,
  muslim: COLOR_SL_FLAG.MUSLIM,
  sl_moor: COLOR_SL_FLAG.MUSLIM,
  sinhalese: COLOR_SL_FLAG.SINHALA,
  sl_tamil: COLOR_SL_FLAG.TAMIL,

  // religious_affiliation_of_population
  buddhist: COLOR_SL_FLAG.BUDDHIST,
  islam: COLOR_SL_FLAG.MUSLIM,
  hindu: COLOR_SL_FLAG.TAMIL,
  roman_catholic: "purple",
  other_christian: "blue",
  christian: "purple",
};
