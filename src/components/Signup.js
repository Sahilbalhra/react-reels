import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BackupIcon from "@mui/icons-material/Backup";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import logo from "../assets/logo.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  // const [file, setFile] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let userCred = await createUserWithEmailAndPassword(auth, email, pwd);
      setUser(userCred.user);

      // Add a new document in collection
      await addDoc(collection(db, "users"), {
        email,
        name,
        reelsIds: [],
        profileImgUrl: "",
        userId: userCred.user.uid,
      });
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
    await signOut(auth);
    setUser(null);
  };
  const Input = styled("input")({
    display: "none",
  });
  return (
    <>
      {loader ? (
        <h1> ... loading</h1>
      ) 
      : user != null ? (
        <>
          <button onClick={signout}>SignOut</button>
          <h1> Signed Up user is {user.uid}</h1>
        </>
      ) 
      : (
        <>
          <Box
            component="div"
            width="600px"
            m="5rem auto 0"
            sx={{ border: "1px solid black", p: 2, borderRadius: "5px" }}
          >
            <Box component="img" src={logo}></Box>
            <form onSubmit={signup}>
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
                sx={{ mb: 2 }}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <TextField
                label="Full Name"
                type="text"
                fullWidth
                sx={{ mb: 2 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <BackupIcon />
                  &ensp; Upload
                </Button>
              </label>
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
                sx={{ mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
          <Box
            component="div"
            width="600px"
            m="auto"
            sx={{
              border: "1px solid black",
              p: 2,
              mt: 2,
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography varient="body1">
              Have an account ?&ensp;
              <Link to="/login" style={{ textDecoration: "none" }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Signup;
