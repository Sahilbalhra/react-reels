import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./Profile.css";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  let cuser = useContext(AuthContext);
  const [user, setUser] = useState();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(function fun(){
    (async function () {
      setPageLoading(true);
      //get user
      //firebase v8
      // var docRef = db.collection("users").doc(user.uid);
      // let userObj=docRef.get();
      // console.log("Doc data:",userObj.data());
      //firebase v9
      
      const docRef = doc(db, "users",cuser.uid);
      const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      // }
      //setuser
      setUser(docSnap.data());
      //setpageloading
      setPageLoading(false);
    })();
  },[]);

  return (
    <>
      {cuser == null ? (
        <div>Need to log in</div>
      ) : // <div>Logged in user is {user.cuser.uid}</div>
      pageLoading ? (
        <div>getting data ...</div>
      ) : (
        <>
          <Box component="div" className="header"></Box>
          <Box component="div" className="main">
            <Box component="div" className="pimg__container">
              <Box
                component="img"
                src={user.profileImgUrl}
                alt=""
                className="pimg"
              />
            </Box>
            <Box component="div" className="details">
              <Box component="div" className="content">
                {user.name}
              </Box>
              <Box component="div" className="content">
                No Of Posts: {user.reelsIds.length}<span className="bold_text">Posts</span>
              </Box>
              <Box component="div" className="content">
                Email: <span className="bold_text">{user.email}</span>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Profile;
