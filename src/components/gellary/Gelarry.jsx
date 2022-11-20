import React, { useContext } from "react";
import { socialContext } from "../../context/socialContext";

import "./gellary.css";

const Gelarry = ({ user }) => {
  const { posts } = useContext(socialContext);

  return (
    <div className="gallery">
      <div className="flex">
        <img src={user?.image || user?.data?.image} alt="" />
        <img
          src={user?.backgroundImageUrl || user?.data?.divbackgroundImageUrl}
          alt=""
        />
        {posts &&
          posts.map(
            (post) =>
              post?.data()?.name === user?.name && (
                <div key={`${post?.data()?.time}${post?.data()?.name}`}>
                  <img src={post?.data()?.postImage} />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Gelarry;
