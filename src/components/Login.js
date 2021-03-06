import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material/";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import logo from "../assets/logo.png";
import person from "../assets/—Pngtree—modern flat design concept of_5332905.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  // const [mainLoader, setMainLoader] = useState(true);

  const login = async (e) => {
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
  const signout = async () => {
    // e.preventDefault();
    await signOut(auth);
    setUser(null);
  };
  // it is used to check user is signed in aur not on page  reload
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      // setMainLoader(false);
    });
  }, []);

  return (
    <>
      {/* {error !== "" ? (
       <h1> Error is {error}</h1>
      ) :  */}
      {/* {mainLoader ? (
        <h1>Page is Loading....</h1>
      ) : */}
      {loader ? (
        <h1> ... loading</h1>
      ) : user != null ? (
        <>
          <button onClick={signout}>SignOut</button>
          <h1> user is {user.uid}</h1>
        </>
      ) : (
        <Box
          component="div"
          width="90%"
          margin="10rem auto"
          sx={{ display: "flex" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={0} md={6}>
              <Box component="img" width="100%" higth="100%" src={person}></Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="div"
                sx={{ border: "2px solid black", p: 2, borderRadius: "10px" }}
              >
                <Box component="img" src={logo} width="100%" higth="100%"></Box>
                <form onSubmit={login}>
                  <TextField
                    label="Enter Email"
                    type="text"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    value={pwd}
                    sx={{ mb: 2 }}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                  {error !== "" ? (
                    <Typography variant="body1" color="red">
                      {error}
                    </Typography>
                  ) : (
                    ""
                  )}
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
              <Box
                component="div"
                m="auto"
                sx={{
                  border: "2px solid black",
                  p: 2,
                  mt: 2,
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography varient="body1">
                  Do not have an account ?&ensp;
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    SignUp
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Login;
