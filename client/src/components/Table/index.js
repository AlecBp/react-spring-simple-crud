import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import { matchSorter } from "match-sorter";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { blue, grey } from "@material-ui/core/colors";
import { Box, TableSortLabel, Typography } from "@material-ui/core";
import ColumnFilter from "../ColumnFilter";

const MyTable = (props) => {
  const { columns, data } = props;

  const _columns = useMemo(() => columns, [columns]);
  const _data = useMemo(() => data, [data]);

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const filterTypes = React.useMemo(() => ({ fuzzyText: fuzzyTextFilterFn }), []);

  const tableInstance = useTable(
    { columns: _columns, data: _data, defaultColumn, filterTypes },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      "& th": {
        fontWeight: 700,
        backgroundColor: `${grey[200]}`,
        borderRight: `1px solid ${grey[300]}`,
        borderLeft: `1px solid ${grey[300]}`,
        paddingRight: "4px",
        paddingLeft: "4px",
        "& p": {
          fontWeight: "600",
        },
      },
      "& tbody": {
        "& tr:hover": {
          backgroundColor: `${blue[100]}`,
        },
      },
    },
  });

  const classes = useStyles();

  return (
    <>
      <TableContainer variant={"outlined"} component={Paper}>
        <Table className={classes.table} size="small" aria-label="clients table" stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <TableCell component="th" {...col.getHeaderProps()}>
                    <Typography {...col.getSortByToggleProps()}>
                      {col.render("Header")}
                      {col.isSorted ? (
                        <TableSortLabel
                          active={col.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction={col.isSortedDesc ? "desc" : "asc"}
                        />
                      ) : (
                        ""
                      )}
                    </Typography>
                    <Box>{col.canFilter ? col.render("Filter") : null}</Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyTable;
