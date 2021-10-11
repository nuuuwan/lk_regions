import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import GIG2 from "../../base/GIG2.js";

export default function DataTable(props) {
  const { regionToGroup, activeTableIndex } = props;
  const dataTable = Object.values(activeTableIndex).filter(
    (d) => regionToGroup[d["entity_id"]]
  );
  const valueKeys = GIG2.filterValueCellKeys(dataTable[0]);
  console.debug(valueKeys);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Region</TableCell>
            {valueKeys.map(function (valueKey) {
              return <TableCell>{valueKey}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((dataRow) => (
            <TableRow
              key={dataRow["entity_id"]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{dataRow["entity_id"]}</TableCell>
              {valueKeys.map(function (valueKey) {
                return <TableCell>{dataRow[valueKey]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
