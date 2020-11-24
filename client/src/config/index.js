import Home from "./../pages/Home";

import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import StudentList from "../pages/StudentList";
import StudentRegistration from "../pages/StudentRegistration";
import StudentProfile from "../pages/StudentProfile";

export const routesConfig = {
  Dashboard: [
    {
      path: "/",
      component: Home,
      exact: true,
      text: "Home",
      icon: <HomeIcon />,
      renderLinkInMenu: true,
      renderAsRoute: true,
    },
  ],
  Students: [
    {
      path: "/student",
      component: StudentList,
      exact: true,
      text: "Students",
      icon: <PeopleIcon />,
      renderLinkInMenu: true,
      renderAsRoute: true,
    },
    {
      path: "/student/add",
      component: StudentRegistration,
      exact: true,
      text: "Register Student",
      icon: <PersonAddIcon />,
      renderLinkInMenu: true,
      renderAsRoute: true,
    },
    {
      path: "/student/edit/:id",
      component: StudentRegistration,
      exact: true,
      renderLinkInMenu: false,
      renderAsRoute: true,
    },
    {
      path: "/student/:id",
      component: StudentProfile,
      exact: true,
      renderLinkInMenu: false,
      renderAsRoute: true,
    },
  ],
};

export const API_ENDPOINTS = {
  base: "http://localhost:9090/api/v1",
};
