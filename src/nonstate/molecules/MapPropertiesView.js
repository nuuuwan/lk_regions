import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { MathX } from "@nuuuwan/utils-js-dev";

import { DataStructures, Humanize, StatX } from "../../base/BaseUtils.js";

const POP_TABLE_NAME = "regions.2012_census.ethnicity_of_population";
const POP_FIELD_KEY = "total_population";

function GroupInfoView(props) {
  const { region, title } = props;
  return (
    <Box key={region.groupID}>
      <Typography variant="h5">
        {Humanize.number(region.pop)}
      </Typography>
      <Typography variant="h7">
        {region.groupID}
      </Typography>
      <Typography variant="caption">{title}</Typography>
    </Box>
  );
}

function PCorrectStats(props) {
  const { popList, pCorrect } = props;

  const meanPop = StatX.mean(popList);
  const limitLower = meanPop / (1 + pCorrect);
  const limitUpper = meanPop * (1 + pCorrect);

  const correctSizeRegions = popList.filter(
    (pop) => limitLower <= pop && limitUpper >= pop
  );
  const nCorrectSizeRegions = correctSizeRegions.length;
  const nRegions = popList.length;

  return (
    <>
      <Box>
        <Typography variant="h5" display="inline">
          {Humanize.percent(nCorrectSizeRegions, nRegions)}
        </Typography>
        <Typography variant="h7" display="inline">
          {" " + nCorrectSizeRegions}
        </Typography>
      </Box>
      <Typography variant="caption">
        Regions within {Humanize.percent(pCorrect, 1)} of Mean Population (
        {Humanize.number(limitLower)} to {Humanize.number(limitUpper)})
      </Typography>
    </>
  );
}

export default function MapPropertiesView(props) {
  const { regionToGroup, tableIndexIndex } = props;
  const popTableIndex = tableIndexIndex[POP_TABLE_NAME];
  const groupToRegions = DataStructures.invertDict(regionToGroup);

  const nRegions = Object.keys(groupToRegions).length;

  const groupInfoList = Object.entries(groupToRegions)
    .map(function ([groupID, regionIDs]) {
      const pop = MathX.sum(
        regionIDs.map(function (regionID) {
          if (popTableIndex[regionID]) {
            return parseInt(popTableIndex[regionID][POP_FIELD_KEY]);
          } else {
            return 0;
          }
        })
      );
      return {
        groupID,
        pop,
      };
    })
    .sort(function (a, b) {
      return a.pop - b.pop;
    });

  const regionMin = groupInfoList[0];
  const regionMax = groupInfoList[nRegions - 1];

  const popList = groupInfoList.map((groupInfo) => groupInfo.pop);

  const meanPop = StatX.mean(popList);
  const stdevPop = StatX.stdev(popList);

  return (
    <Box>
      <Typography variant="h5">{nRegions}</Typography>
      <Typography variant="caption">Number of Regions</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">{"Population Balance"}</Typography>

        <Box>
          <Typography variant="h5" display="inline">
            {Humanize.number(meanPop)}
          </Typography>
          <Typography variant="h7" display="inline">
            {" ± " + Humanize.number(stdevPop * 2)}
          </Typography>
        </Box>
        <Typography variant="caption">
          Mean Population ± 3 Standard Deviations
        </Typography>

        <GroupInfoView title="Smallest Region" region={regionMin} />
        <GroupInfoView title="Largest Region" region={regionMax} />

        <Box>
          <Typography variant="h5" display="inline">
            {(regionMax.pop / regionMin.pop).toPrecision(2) + " : 1"}
          </Typography>
        </Box>
        <Typography variant="caption">Largest : Smallest</Typography>

        <PCorrectStats popList={popList} pCorrect={0.1} />
        <PCorrectStats popList={popList} pCorrect={0.2} />
        <PCorrectStats popList={popList} pCorrect={0.4} />
      </Paper>
    </Box>
  );
}
