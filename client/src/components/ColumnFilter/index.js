import React from "react";
import { TextField } from "@material-ui/core";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <TextField
        id="standard-search"
        size="small"
        variant="standard"
        margin="none"
        label="Search field"
        type="search"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default ColumnFilter;
