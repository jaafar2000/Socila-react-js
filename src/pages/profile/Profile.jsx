import React, { useContext, useEffect, useState } from "react";
import AddPost from "../../components/addPost/AddPost";
import Post from "../../components/post/Post";
import { socialContext } from "../../context/socialContext";
import { FiEdit } from "react-icons/fi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UpdateProfile from "../../components/updateProfile/UpdateProfile";
import Modal from "@mui/material/Modal";
import "./profile.css";
import Gelarry from "../../components/gellary/Gelarry";

const Profile = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    color: "black",
    p: 2,
  };
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
  const [openBio, setOpenBio] = React.useState(false);
  const handleOpenBio = () => setOpenBio(true);
  const handleCloseBio = () => setOpenBio(false);
  const [profilePosts, setProfilePosts] = useState([]);
  const { user, handleClose, handleOpen, posts, open } =
    useContext(socialContext);

  useEffect(() => {
    setProfilePosts(
      posts.filter((post) => {
        return post?.data()?.name == user?.name;
      })
    );
  }, [posts]);
  return (
    <div className="Profile">
      <div className="prfile__header">
        <div className="profile__background">
          <img
            className="background"
            src={`${
              user?.backgroundImageUrl == null
                ? "https://media.istockphoto.com/photos/grunge-wall-picture-id174931919?b=1&k=20&m=174931919&s=170667a&w=0&h=cPromaevJ8swveEAuDcOUs59mQxsmTXZMc91x1pAGtA="
                : user?.backgroundImageUrl
            }`}
            alt=""
          />
          <div className="child">
            <img className="pic" src={user?.image} alt="" />
          </div>
        </div>
      </div>

      {/* info */}
      <div className="header__info">
        <div>
          <h1>{user?.displayName ? user?.displayName : user?.name}</h1>
          <p>{user?.email}</p>

          {user?.Bio && (
            <p onClick={handleOpenBio}>
              {user?.Bio.length > 50
                ? `${(user?.Bio).slice(0, 50)}..`
                : user?.Bio}
            </p>
          )}
          <Modal
            open={openBio}
            onClose={handleCloseBio}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
              <p className="box_p">{user?.Bio}</p>
            </Box>
          </Modal>
        </div>
        <Button onClick={handleOpen}>
          <button className="btn__update">
            Update Profile <FiEdit />
          </button>
        </Button>
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <UpdateProfile />
            </Box>
          </Modal>
        </>
      </div>
      {/* posts and add post */}
      <div className="profiel__feed">
        <div className="posts">
          <h3 style={{ margin: "1rem" }}>Your Posts {user?.name} </h3>
          <div className="postContainer">
            {profilePosts.length > 0 ? (
              profilePosts.map((post) => (
                <>
                  <Post
                    id={post.id}
                    key={post.id}
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
              <p className="noPostToShow">You dont have any post yet</p>
            )}
          </div>
        </div>
        <div className="addPost">
          <h3 style={{ margin: "1rem" }}>Start Post</h3>
          <AddPost user={user} />
          <h3 style={{ margin: "1rem" }}>Gallery</h3>

          <Gelarry user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
