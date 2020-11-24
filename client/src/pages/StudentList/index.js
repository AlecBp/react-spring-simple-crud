import React, { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import axios from "axios";
import { API_ENDPOINTS } from "../../config";
import Loading from "../../components/Loading";

import Table from "./../../components/Table";
import { Box, IconButton, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const StudentList = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const deleteStudentWithId = (id) => {
    axios
      .delete(`${API_ENDPOINTS.base}/employees/${id}`)
      .then((res) => {
        console.log("DELETING STUDENT", id);
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const groupedColumns = [
    {
      Header: "Information",
      columns: [
        {
          Header: "First name",
          accessor: "firstName",
          filter: "fuzzyText",
        },
        {
          Header: "Last name",
          accessor: "lastName",
          filter: "fuzzyText",
        },
        { Header: "Email", accessor: "emailId", filter: "fuzzyText" },
      ],
    },
    {
      Header: "Actions",
      columns: [
        {
          Header: "Action",
          accessor: (row) => (
            <Box padding={0} style={{ width: "135px" }}>
              <IconButton color="primary" onClick={() => history.push(`/student/edit/${row.id}`)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton color="primary" onClick={() => deleteStudentWithId(row.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton color="primary" onClick={() => history.push(`/student/${row.id}`)}>
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Box>
          ),
          disableFilters: true,
        },
      ],
    },
  ];

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.base}/employees`)
      .then((data) => {
        console.log(data);
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      <Box my={3}>
        <Typography variant="h3">Student List</Typography>
      </Box>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Table columns={groupedColumns} data={data} />
    </Box>
  );
};

export default StudentList;
