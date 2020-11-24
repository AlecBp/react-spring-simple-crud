import { Box, Container, LinearProgress, Typography } from "@material-ui/core";
import React from "react";

const Loading = () => {
  return (
    <Container>
      <Box fullwidth="true" display="flex" justifyContent="center" alignItems="center" mt={5}>
        <Box>
          <Typography variant="h4">Loading...</Typography>
        </Box>
      </Box>
      <Box my={3}>
        <LinearProgress color="primary" />
      </Box>
    </Container>
  );
};

export default Loading;
