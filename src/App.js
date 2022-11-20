import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import People from "./pages/people/People";
import Profile from "./pages/profile/Profile";

import { useContext } from "react";
import { socialContext } from "./context/socialContext";
import "./global.css";
import SignIn from "./pages/signin/SignIn";
import UserDetail from "./pages/userDetails/UserDetail";
function App() {
  const { user } = useContext(socialContext);
  return (
    <div className="App">
      <Header />
      {!user ? (
        <SignIn />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/people" element={<People />} />
            <Route path=":id" element={<UserDetail/>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
