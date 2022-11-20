import { Avatar } from "@mui/material";
import React, { useContext, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { socialContext } from "../../context/socialContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import db from "../../firebase";
import "./addPost.css";

const AddPost = () => {
  const { user } = useContext(socialContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 2,
  };

  const [open, setOpen] = React.useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const colRef = collection(db, "Posts");
    if (image) {
      const storageRef = ref(storage, `${caption}`);
      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (download) => {
          try {
            if (download) {
              await addDoc(colRef, {
                postImage: download,
                displayName: user?.displayName,
                email: user?.email,
                userId: user?.id,
                name: user?.name,
                caption: caption,
                time: serverTimestamp(),
                userImage: user?.image,
              });
            }
          } catch {
            console.log("err");
          }
        });
      });
    } else {
      await addDoc(colRef, {
        postImage: "",
        displayName: user?.displayName,
        email: user?.email,
        userId: user?.id,
        name: user?.name,
        caption: caption,
        time: serverTimestamp(),
        userImage: user?.image,
      });
    }

    setCaption("");
    setImage("");
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="add__post">
      <div className="add__post__head">
        <div className="border">
          <Avatar src={user?.image} />
        </div>
        <input
          className="inputPost"
          type="text"
          onClick={handleOpen}
          placeholder="whats in your mind?"
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={(e) => e.preventDefault()} className="box">
              <label htmlFor="file">
                {" "}
                <i>
                  <AiOutlineCamera />
                </i>
                <p>Upload Photo</p>
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
                type="file"
                id="file"
              />
              <input
                className="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                placeholder="whats in your mind?"
              />
              <button
                disabled={loading}
                className="btn"
                onClick={(e) => handleClick(e)}
                type="submit"
              >
                {loading ? "Loading.." : "Post"}
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AddPost;
