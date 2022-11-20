import { Avatar } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { FaSignOutAlt } from "react-icons/fa";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { socialContext } from "../../context/socialContext";

import "./header.css";
const Header = () => {
  const { user, sighnOut } = useContext(socialContext);
  const [active, setActive] = useState("Home");

  return (
    <div className="header ">
      <div className="container">
        <div className="header__logo">
          <h2>
            <span>Soc</span>
            <span>ila</span>
          </h2>
        </div>
        <div className="header__links">
          <Link
            className={`header__icon ${active === "Home" && "active"} `}
            onClick={() => setActive("Home")}
            to=""
          >
            <HomeIcon />
          </Link>
          <Link
            className={`header__icon ${active === "people" && "active"} `}
            to="/people"
            onClick={() => setActive("people")}
          >
            <GroupIcon />
          </Link>
          <Link
            className={`header__icon ${active === "profile" && "active"} `}
            to="/profile"
            onClick={() => setActive("profile")}
          >
            <AccountCircleIcon />
          </Link>
        </div>
        <div className="header-profile-pic">
          <div className="border">
            {user && <Avatar className="avatar" src={user?.image} />}
          </div>
          {user && (
            <div className="Logout">
              <FaSignOutAlt className="iconSignOut" />
              <p onClick={sighnOut}> LogOut</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
