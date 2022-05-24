import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material/";
import Typography from "@mui/material/Typography";
import { auth } from "../firebase"
const Login = () => {
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const printDetails = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pwd);
    auth.signInWithEmailAndPassword(email, pwd)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };
  return (
    <Box
      component="div"
      width="80%"
      m="auto"
      sx={{ border: "2px solid black", p: 2, borderRadius: "25px" }}
    >
      <form onSubmit={printDetails}>
        <TextField
          label="Enter Email"
          type="text"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="dense"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <Typography variant="body1" color="red">
          Error
        </Typography>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          // onClick={(e) => e.preventDefault()}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
