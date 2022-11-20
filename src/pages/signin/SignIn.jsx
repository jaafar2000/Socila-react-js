import React, { useContext, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { socialContext } from "../../context/socialContext";
import db from "../../firebase";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import "./signin.css";

const SignIn = () => {
  const { setUser, users } = useContext(socialContext);
  const [nowUser, setNow] = useState("");
  const signIn = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      if (users.length == 0) {
        try {
          console.log("sdfasd");
          setDoc(doc(db, "users", `${result?.user?.displayName}`), {
            name: result?.user?.displayName,
            displayName: "",
            id: result?.user?.uid,
            email: result?.user?.email,
            image: result?.user?.photoURL,
            backgroundImage: null,
          });
        } catch {
          console.log("err");
        }
      } else {
        if (users.includes(result?.user?.displayName)) {
          console.log("yes")
          const doRef = doc(db, "users", `${result?.user.displayName}`);
          getDoc(doRef).then((docsnap) => {
            setUser(docsnap.data());
          });
        } else {
          setDoc(doc(db, "users", `${result?.user?.displayName}`), {
            name: result?.user?.displayName,
            displayName: "",
            id: result?.user?.uid,
            email: result?.user?.email,
            image: result?.user?.photoURL,
            backgroundImage: null,
          });
        }
      }
    });
  }; //end of sign in

  return (
    <div className="signin">
      <h1>SOCILA</h1>
      <p>Welcome to our website.</p>
      <button className="signin__btn" onClick={signIn}>
        <span>Sign in with</span>
        <BsGoogle />
      </button>
    </div>
  );
};

export default SignIn;
