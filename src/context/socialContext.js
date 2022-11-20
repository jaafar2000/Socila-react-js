import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import { signOut } from "firebase/auth";

export const socialContext = createContext();

const SocialContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const docRef = doc(db, "users", `${user?.displayName}`);

      onSnapshot(docRef, (snapshot) => {
        setUser(snapshot.data());
      });
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const colRef = collection(db, "Posts");
    const q = query(colRef, orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, []);

  useEffect(() => {
    const userRef = collection(db, "users");
    onSnapshot(userRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => (doc.id )));
    });
  }, []);
  useEffect(() => {
    const userRef = collection(db, "users");
    onSnapshot(userRef, (snapshot) => {
      setUserDetails(
        snapshot.docs.map((doc) => ({ name: doc.id, data: doc.data() }))
      );
    });
  }, []);

  const sighnOut = () => {
    signOut(auth)
      .then(() => {
        setUser("");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const value = {
    posts,
    user,
    setOpen,
    open,
    setUser,
    sighnOut,
    handleOpen,
    handleClose,
    usersDetails,
    users,
  };
  return (
    <socialContext.Provider value={value}>{children}</socialContext.Provider>
  );
};
export default SocialContextProvider;
