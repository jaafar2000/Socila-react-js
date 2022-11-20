import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socialContext } from "../../context/socialContext";
import Post from "../../components/post/Post";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Gelarry from "../../components/gellary/Gelarry";
import "./userDetail.css";
import db from "../../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  backgroundColor: "#0f0f0f",
  p: 4,
  border: "2px solid gray",
};

const UserDetail = () => {
  const { id } = useParams();
  const { usersDetails } = useContext(socialContext);
  const handleOpenBio = () => setOpenBio(true);
  const handleCloseBio = () => setOpenBio(false);
  const [checkUser, setCheckUser] = useState();
  const [openBio, setOpenBio] = React.useState(false);
  const { posts, user } = useContext(socialContext);
  const [profilePosts, setProfilePosts] = useState([]);

  useEffect(() => {
    usersDetails.map((user) => {
      console.log(id);
      if (user?.data?.id == id) {
        setCheckUser(user);
      }
    });
  }, [id]);
  useEffect(() => {
    const unsub = () => {
      setProfilePosts(
        posts.filter((post) => {
          return post?.data()?.name == user?.name;
        })
      );
    };
    return () => {
      unsub();
    };
  }, [posts]);
  return (
    <div className="Profile">
      <div className="prfile__header">
        <div className="profile__background">
          <img
            className="background"
            src={`${
              checkUser?.data?.backgroundImageUrl == null
                ? "https://media.istockphoto.com/photos/grunge-wall-picture-id174931919?b=1&k=20&m=174931919&s=170667a&w=0&h=cPromaevJ8swveEAuDcOUs59mQxsmTXZMc91x1pAGtA="
                : user?.backgroundImageUrl
            }`}
            alt=""
          />
          <div className="child">
            <img className="pic" src={checkUser?.data?.image} alt="" />
          </div>
        </div>
      </div>

      {/* info */}
      <div className="header__info">
        <div>
          <h1>
            {checkUser?.data?.displayName
              ? checkUser?.data?.displayName
              : checkUser?.data?.name}
          </h1>
          <p>{checkUser?.data.email}</p>

          {checkUser?.data?.Bio && (
            <p onClick={handleOpenBio}>
              {checkUser?.data.Bio.length > 50
                ? `${(checkUser?.data.Bio).slice(0, 50)}..`
                : checkUser?.data.Bio}
            </p>
          )}
          <Modal
            open={openBio}
            onClose={handleCloseBio}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
              <p className="box_p">{checkUser?.data?.Bio}</p>
            </Box>
          </Modal>
        </div>
      </div>
      {/* posts and add post */}
      <div className="profiel__feed">
        <div className="posts">
          <h3 style={{ margin: "1rem" }}>Your Posts</h3>
          <div className="postContainer">
            {profilePosts.length > 0 ? (
              profilePosts.map((post, index) => (
                <>
                  <Post
                    id={post.id}
                    key={`${post?.data()?.id}${index}`}
                    name={post?.data()?.name}
                    displayName={post?.data()?.displayName}
                    email={post?.data()?.email}
                    postImage={post?.data()?.postImage}
                    time={post?.data()?.time?.seconds}
                    caption={post?.data()?.caption}
                    image={post?.data()?.userImage}
                  />
                </>
              ))
            ) : (
              <p className="noPostToShow">No Posts To Show</p>
            )}
          </div>
        </div>
        <div className="addPost">
          <h3 style={{ margin: "1rem" }}>Gallery</h3>

          <Gelarry user={checkUser} />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
