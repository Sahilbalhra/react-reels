import React from "react";
import logo from "../assets/logo.png";
import "./Feed.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Box } from "@mui/material/";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

const Feed = () => {
  return (
    <>
      <Box component="div" className="header">
        <img src={logo} alt="" className="logo_img" />
        <IconButton>
          <img
            src="https://media-exp1.licdn.com/dms/image/C5103AQGve0Cg0S9AoA/profile-displayphoto-shrink_100_100/0/1585461609087?e=1659571200&v=beta&t=0du2yuQjjWC5RgCtWNIBv4M-g34Tup8zqhErCGvByvg"
            alt=""
            className="profile_img"
          />
        </IconButton>
      </Box>
      <Box component="div" className="main_container">
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button variant="outlined" component="span">
              <CloudUploadIcon /> &nbsp; Upload
            </Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Stack>
        <div className="upload_Container">upload</div>
        <Box component="div" className="reels">
          Reels
        </Box>
      </Box>
    </>
  );
};

export default Feed;
