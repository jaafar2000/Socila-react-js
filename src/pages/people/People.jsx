import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { socialContext } from "../../context/socialContext";

import "./pepole.css";
const People = () => {
  const { usersDetails, user } = useContext(socialContext);
  console.log(usersDetails);
  return (
    <div className="pepole_section">
      <h1>people around</h1>
      <div className="pepole">
        {usersDetails.map((usr, index) => (
          <Link to={`/${usr?.data?.id}`}>
            <div className="card" key={index}>
              <div className="cover">
                <img
                  className="image__cover"
                  src={`${
                    usr?.data?.backgroundImageUrl == null
                      ? "https://media.istockphoto.com/photos/grunge-wall-picture-id174931919?b=1&k=20&m=174931919&s=170667a&w=0&h=cPromaevJ8swveEAuDcOUs59mQxsmTXZMc91x1pAGtA="
                      : usr?.data?.backgroundImageUrl
                  }`}
                  alt=""
                />
                <div className="profile__photo">
                  <Avatar
                    sx={{ width: 75, height: 75 }}
                    src={usr?.data?.image}
                    alt=""
                  />
                </div>
              </div>
              <div className="info">
                <h3>
                  {usr?.data?.name === user?.name
                    ? `Me:${user?.name}`
                    : `${usr?.data?.name}`}
                </h3>
                <h4>{usr?.data?.displayName  }</h4>
                <p>{usr?.data?.email   }</p>
                <p>{usr?.data?.Bio  }</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default People;
