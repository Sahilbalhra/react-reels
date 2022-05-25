import React from "react";
import { Box } from "@mui/material";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <Box component="div" className="header"></Box>
      <Box component="div" className="main">
        <Box component="div" className="pimg__container">
          <Box
            component="img"
            src="http://via.placeholder.com/640x360"
            alt=""
            className="pimg"
          />
        </Box>
        <Box component="div" className="details">
          <Box component="div" className="content">
            Name
          </Box>
          <Box component="div" className="content">
            No Of Posts: <span className="bold_text">Posts</span>
          </Box>
          <Box component="div" className="content">
            Email: <span className="bold_text">email@gmail.com</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
