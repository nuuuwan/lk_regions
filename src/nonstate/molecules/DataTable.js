import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import GIG2 from "../../base/GIG2.js";
import RegionChip from "../../stateful/atoms/RegionChip.js";

export default function DataTable(props) {
  const { regionToGroup, activeTableIndex } = props;
  const dataTable = Object.values(activeTableIndex).filter(
    (d) => regionToGroup[d["entity_id"]]
  );
  const valueKeys = GIG2.filterValueCellKeys(dataTable[0]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell />
            {valueKeys.map(function (valueKey) {
              return (
                <TableCell key={"header-" + valueKey}>{valueKey}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map(function (dataRow) {
            const regionID = dataRow["entity_id"];
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
