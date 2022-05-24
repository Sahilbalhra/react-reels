import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import secret from "./secrets";
let app = initializeApp(secret);

export let auth = getAuth(app);
export {signInWithEmailAndPassword}
