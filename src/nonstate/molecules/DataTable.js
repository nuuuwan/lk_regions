import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { StringX } from "@nuuuwan/utils-js-dev";
import { Humanize } from "../../base/BaseUtils.js";
import GIG2 from "../../base/GIG2.js";
import RegionChip from "../../stateful/atoms/RegionChip.js";

function renderHeaderCell(valueKey) {
  return (
    <TableCell key={"header-" + valueKey} align="right" width="30">
      {StringX.toTitleCase(valueKey)}
    </TableCell>
  );
}

function TableCellNumber(props) {
  const { value, valueSum, valueKey } = props;
  const humanizedValue = Humanize.number(value);
  const humanizedPercent = Humanize.percent(value, valueSum);
  const p = value / valueSum;

  let backgroundColor = "white";
  if (p > 0.5) {
    backgroundColor = GIG2.getValueKeyColor(valueKey);
  }

  let opacity = 0.2;
  if (p > 0.5) {
    opacity = p;
  } else if (p > 0.1) {
    opacity = 0.5;
  } else if (p > 0.01) {
    opacity = 0.4;
  }

  const styleText = {
    backgroundColor,
    opacity,
    borderRadius: 3,
    padding: 3,
  };

  return (
    <TableCell align="right">
      <div style={styleText}>
        <div style={{ fontSize: 15 }}>{humanizedPercent}</div>
        <div style={{ fontSize: 9 }}>{humanizedValue}</div>
      </div>
    </TableCell>
  );
}

export default function DataTable(props) {
  const { regionToGroup, activeTableIndex } = props;
  const filteredTableIndex = Object.entries(activeTableIndex).reduce(function (
    filteredTableIndex,
    [regionID, tableRow]
  ) {
    if (regionToGroup[regionID]) {
      filteredTableIndex[regionID] = tableRow;
    }
    return filteredTableIndex;
  },
  {});
  const finalTableIndex = GIG2.mergeAndExpandOtherOnTable(filteredTableIndex);
  const valueKeys = GIG2.getValueKeys(GIG2.getFirstRow(finalTableIndex));

  return (
    <TableContainer
      sx={{ position: "absolute", top: 60, bottom: 20, width: 560 }}
    >
      <Table stickyHeader padding="none">
        <TableHead>
          <TableRow>
            <TableCell align="right" width="80" />
            {valueKeys.map(renderHeaderCell)}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(finalTableIndex).map(function ([regionID, dataRow]) {
            const valueSum = GIG2.getValueSum(dataRow);
            return (
              <TableRow key={regionID}>
                <TableCell>
                  <RegionChip regionID={regionID} />
                </TableCell>
                {valueKeys.map(function (valueKey) {
                  return (
                    <TableCellNumber
                      key={regionID + "-" + valueKey}
                      value={dataRow[valueKey]}
                      valueSum={valueSum}
                      valueKey={valueKey}
                    />
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}