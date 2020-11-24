import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../config";
import Loading from "../../components/Loading";
import EditIcon from "@material-ui/icons/Edit";

const StudentProfile = () => {
  const studentId = useParams("id").id;
  const history = useHistory();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.base}/employees/${studentId}`)
      .then((data) => {
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
      <Box display="flex" justifyContent="center">
        <Box my={5} maxWidth={600}>
          <Paper elevation={5}>
            <Box padding={5}>
              <Box mb={5}>
                <Typography align="center" variant="h3">
                  Student Profile
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <Typography variant="h5">First name: {data.firstName}</Typography>
                </Grid>
                <Grid xs={12} item>
                  <Typography variant="h5">Last name: {data.lastName}</Typography>
                </Grid>
                <Grid xs={12} item>
                  <Typography variant="h5">Email: {data.emailId}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" mt={5}>
                    <Button
                      onClick={() => history.push(`/student/edit/${studentId}`)}
                      color="secondary"
                      variant="contained"
                      startIcon={<EditIcon />}
                    >
                      EDIT
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentProfile;
