import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./Profile.css";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  let user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {

      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  }, [user]);

  return (
    <>
      {user == null ? (
        <div>Need to log in</div>
      ) : // <div>Logged in user is {user.cuser.uid}</div>
      loading ? (
        <div>getting data ...</div>
      ) : (
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
      )}
    </>
  );
};

export default Profile;
