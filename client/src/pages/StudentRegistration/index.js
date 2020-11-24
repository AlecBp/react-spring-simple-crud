import { Box, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import MyTextField from "../../components/MyTextField";
import { getPropsForFieldName as _getPropsForFieldName } from "./../../utils";
import axios from "axios";
import { API_ENDPOINTS } from "../../config";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const StudentRegistration = () => {
  const [initialState, setInitialState] = useState({ firstName: "", lastName: "", emailId: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const studentId = useParams("id").id;

  const isAddMode = studentId ? false : true;

  const yupSchema = yup.object({
    firstName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Use only (a-z), (A-Z) e ' '")
      .required("First name is a required field"),
    lastName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Use only (a-z), (A-Z) e ' '")
      .required("Last name is a required field"),
    emailId: yup.string().email("Not a valid email").required("Email is a required field"),
  });

  if (!isAddMode && !loading) {
  }

  useEffect(() => {
    if (!isAddMode) {
      axios
        .get(`${API_ENDPOINTS.base}/employees/${studentId}`)
        .then((data) => {
          const { firstName, lastName, emailId } = data.data;
          setInitialState({ firstName, lastName, emailId });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const submission = async (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    if (isAddMode) {
      axios
        .post(`${API_ENDPOINTS.base}/employees`, data)
        .then((res) => {
          console.log(res.data);
          setSubmitting(false);
          history.push(`/student/${res.data.id}`);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setSubmitting(false);
        });
    } else {
      axios
        .put(`${API_ENDPOINTS.base}/employees/${studentId}`, data)
        .then((res) => {
          console.log(res.data);
          setSubmitting(false);
          history.push(`/student/${res.data.id}`);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setSubmitting(false);
        });
    }
  };

  const getPropsForFieldName = React.useMemo(() => _getPropsForFieldName);

  if (loading) return <Loading />;

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box my={5} maxWidth={600}>
          {error && <Typography>ERROR: {error}</Typography>}
          <Paper elevation={5}>
            <Box padding={5}>
              <Formik initialValues={initialState} validationSchema={yupSchema} onSubmit={submission}>
                {({ values, errors, isSubmitting, handleSubmit, handleBlur, handleChange, touched }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Box>
                        <Box mb={5}>
                          <Typography align="center" variant="h3">
                            Student Registration
                          </Typography>
                        </Box>
                        <Grid container spacing={3}>
                          <Grid xs={12} item>
                            <MyTextField
                              required
                              name="firstName"
                              type="input"
                              label="First Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              {...getPropsForFieldName("firstName", values, touched, errors)}
                            />
                          </Grid>
                          <Grid xs={12} item>
                            <MyTextField
                              required
                              name="lastName"
                              type="input"
                              label="Last Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              {...getPropsForFieldName("lastName", values, touched, errors)}
                            />
                          </Grid>
                          <Grid xs={12} item>
                            <MyTextField
                              required
                              name="emailId"
                              type="input"
                              label="Email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              {...getPropsForFieldName("emailId", values, touched, errors)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Box mt={5}>
                              <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                disable={isSubmitting ? "true" : undefined}
                                type="submit"
                              >
                                <Typography>{isAddMode ? "Register" : "Update"}</Typography>
                              </Button>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box mt={5}>
                              <Button
                                fullWidth
                                color="secondary"
                                variant="contained"
                                disable={isSubmitting ? "true" : undefined}
                                type="button"
                                onClick={() => history.push("/student")}
                              >
                                <Typography>Cancel</Typography>
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </form>
                  );
                }}
              </Formik>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentRegistration;
