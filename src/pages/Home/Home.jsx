import React, { useContext, useState } from "react";
import { Avatar } from "@mui/material";
import AddPost from "../../components/addPost/AddPost";
import Post from "../../components/post/Post";
import { Link } from "react-router-dom";
import { socialContext } from "../../context/socialContext";
import "./home.css";
import { GrFormAdd } from "react-icons/gr";
const Home = () => {
  const style = { margin: "0.5rem", padding: "1rem 0 0 1rem" };
  const { posts, user, usersDetails } = useContext(socialContext);

  return (
    <>
      <p className="welcome">Welcome , {user?.displayName || user?.name}</p>
      <div className="home">
        <div className="addpost__posts">
          <div className="AddPostSection">
            <h3 style={style}>Add post </h3>
            <AddPost />
          </div>
          <div className="posts_section">
            {posts.length ? (
              posts.map((post,index) => (
                <Post
                  id={post.id}
                  key={`$${index}${post?.id}`}
                  name={post?.data()?.name}
                  displayName={post?.data()?.displayName}
                  email={post?.data()?.email}
                  postImage={post?.data()?.postImage}
                  time={post?.data()?.time?.seconds}
                  caption={post?.data()?.caption}
                  image={post?.data()?.userImage}
                />
              ))
            ) : (
              <p className="noPostToShow">No Post To Show</p>
            )}
          </div>
        </div>

        <div className="miniProfile__user">
          <div className="miniProfile">
            <h3 style={style}>Profile</h3>

            <div className="info">
              <Avatar src={user?.image} alt="" />
              <div className="name">
                <h4>{user?.displayName || user?.name}</h4>
                <p>{user?.name}</p>
              </div>
            </div>
          </div>

          <div className="users">
            <h3 style={style}>users</h3>
            <div>
              {usersDetails.map((user, index) => (
                <div
                  className="user__section"
                  key={`${user?.data?.id}${index}`}
                >
                  <Link to={`${user?.data?.id}`}>
                    <div className="sideProfiel">
                      <Avatar
                        style={{ marginRight: "0.5rem" }}
                        src={user?.data?.image}
                      />
                      <div>
                        <div>
                          <h5>{user?.data?.displayName || user?.data?.name}</h5>
                          <p>{(user?.data?.email).slice(0, 20)}...</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
