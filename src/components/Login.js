import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material/";
import { auth, signInWithEmailAndPassword } from "../firebase";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const printDetails = async (e) => {
    e.preventDefault();
    // console.log(email + " " + pwd);
    try {
      setLoader(true);
      let userCred = await signInWithEmailAndPassword(auth, email, pwd);
      // console.log(userCred.user);
      setUser(userCred.user);
    } catch (err) {
      setError(err.message);
      //after some error mssg should be disapear
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    setLoader(false);
  };
  return (
    <>
      {error !== "" ? (
        <h1> Error is {error}</h1>
      ) : loader ? (
        <h1> ... loading</h1>
      ) : user != null ? (
        <h1> user is {user.uid}</h1>
      ) : (
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
      )}
    </>
  );
};

export default Login;
