import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { StringX } from "@nuuuwan/utils-js-dev";
import GIG2 from "../../base/GIG2.js";
import RegionChip from "../../stateful/atoms/RegionChip.js";

function renderHeaderCell(valueKey) {
  return (
    <TableCell key={"header-" + valueKey}>
      {StringX.toTitleCase(valueKey)}
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
  const finalTableIndex = GIG2.expandOtherOnTable(filteredTableIndex);
  const valueKeys = GIG2.getValueKeys(GIG2.getFirstRow(finalTableIndex));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell />
            {valueKeys.map(renderHeaderCell)}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(finalTableIndex).map(function ([regionID, dataRow]) {
            return (
              <TableRow
                key={regionID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <RegionChip regionID={regionID} />
                </TableCell>
                {valueKeys.map(function (valueKey) {
                  return (
                    <TableCell key={regionID + valueKey}>
                      {dataRow[valueKey]}
                    </TableCell>
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
