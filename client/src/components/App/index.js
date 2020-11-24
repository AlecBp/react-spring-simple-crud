import React, { useState } from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../Navbar";
import { routesConfig } from "./../../config";
import clsx from "clsx";
import NotFound from "../../pages/NotFound";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const RenderRoutes = ({ routesConfig }) => {
  const keys = Object.keys(routesConfig);

  return (
    <Switch>
      {keys.map((key) =>
        routesConfig[key].map(({ path, component, exact, renderAsRoute }) => (
          <Route key={path} path={path} component={component} exact={exact} />
        ))
      )}
      <Route component={NotFound} />
    </Switch>
  );
};

const App = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <div className={classes.root}>
            <CssBaseline />
            <Navbar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <RenderRoutes routesConfig={routesConfig} />
            </main>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
