import React from "react";
import { Box } from "@mui/material";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <Box component="div" className="header"></Box>
      <Box component="div" className="main">
        <Box component="img" src="http://via.placeholder.com/640x360" alt="" className="pimg"/>
        <Box component="div" className="details">
          <Box component="div" className="content">
            Name
          </Box>
          <Box component="div" className="content">
            No Of Posts: <span>Posts</span>
          </Box>
          <Box component="div" className="content">
            Email<span>email@gmail.com</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
