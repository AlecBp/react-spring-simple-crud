import { Box, Typography, Button } from "@material-ui/core";
import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";

const Home = () => {
  return (
    <Box my={3}>
      <Typography variant="h1">React CRUD</Typography>

      <Box my={3}>
        <Typography variant="h2">Alec Pagliarussi</Typography>
        <Typography variant="h2">ID: 101196746</Typography>
      </Box>

      <Box my={3}>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          onClick={() => window.open("https://github.com/AlecBp/React-Spring-CRUD", "_blank")}
          startIcon={<GitHubIcon />}
        >
          GITHUB
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
