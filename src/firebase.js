import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import secret from "./secrets";
firebase.initializeApp(secret);

export let auth =firebase.auth();
