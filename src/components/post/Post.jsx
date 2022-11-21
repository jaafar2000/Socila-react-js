import { Avatar } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { BiSend } from "react-icons/bi";
import db from "../../firebase";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { socialContext } from "../../context/socialContext";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiFillLike,
  AiOutlineDelete,
} from "react-icons/ai";
import "./post.css";
import Moment from "react-moment";
const Post = ({ id, name, postImage, caption, displayName, image, time }) => {
  const { user } = useContext(socialContext);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const colRef = collection(db, "Posts", id, "comments");
    const q = query(colRef, orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [comment]);

  useEffect(() => {
    const colRef = collection(db, "Posts", id, "likes");
    onSnapshot(colRef, (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [id, db]);

  // handleClick add commnet
  const handleClick = async () => {
    const colRef = collection(db, "Posts", id, "comments");
    await addDoc(colRef, {
      displayName: user?.displayName,
      name: user?.name,
      userId: user?.id,
      userImage: user?.image,
      comment: comment,
      time: serverTimestamp(),
    });
    setComment("");
  };

  useEffect(
    () => setLiked(likes.findIndex((like) => like.id === user?.id) !== -1),
    [likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "Posts", id, "likes", user?.id));
    } else {
      await setDoc(doc(db, "Posts", id, "likes", user?.id), {
        name: user?.displayName,
        image: user?.image,
      });
    }
  };
  const DeletePost = (id) => {
    if (window.confirm("are you sure")) {
      const colRef = doc(db, "Posts", id);
      deleteDoc(colRef).then(() => {});
    }
  };
  const DeleteComment = (postId, commentId) => {
    if (window.confirm("are you sure")) {
      const colRef = doc(db, "Posts", `${postId}`, "comments", `${commentId}`);
      deleteDoc(colRef).then(() => {});
    }
  };

  return (
    <div className="post">
      <div className="postHeader">
        <Avatar className="avatar" src={image} />
        <div className="name_time">
          <p>{displayName || name}</p>
          <p> {new Date(time * 1000).toUTCString().slice(0, 11)}</p>
        </div>
        <i>
          <MoreHorizIcon />
        </i>
      </div>
      <div className="post__Content">
        <p className="caption">{caption}</p>
        {postImage && <img src={postImage} />}
      </div>
      {/* icons */}
      <div className="post__icnos_andLikeCount">
        <div className="post__icon">
          <div className="icon" onClick={likePost}>
            <i>
              {!liked ? (
                <AiOutlineLike />
              ) : (
                <AiFillLike style={{ color: "white" }} />
              )}
            </i>
          </div>

          <div className="icon">
            <i>
              <AiOutlineComment />
            </i>
          </div>

          <div className="icon">
            <i>
              <AiOutlineShareAlt />
            </i>
          </div>
          {user?.name === name && (
            <div className="icon del">
              <i onClick={() => DeletePost(id)}>
                <AiOutlineDelete />
              </i>
            </div>
          )}
        </div>
        <div className="likes">
          <p style={{ fontSize: "15px" }}>
            <span>{likes.length >= 1 ? `${likes.length} Like` : ""}</span>{" "}
            <span>
              {comments.length > 1 ? `${comments.length} Comment` : ""}
            </span>{" "}
          </p>
        </div>
      </div>
      {/* comments */}
      <div className="comments">
        {comments &&
          comments.map((comment) => (
            <div className="comment" key={comment?.data()?.time?.seconds}>
              <Avatar
                src={comment?.data()?.userImage}
                sx={{ width: 30, height: 30, marginRight: "0.5rem" }}
                className="comment__avatar"
              />
              <p>{comment.data().displayName || comment.data().name}</p>
              <p>{comment.data().comment}</p>
              <p>
                {(user?.name === name ||
                  user?.name === comment.data().name) && (
                  <span
                    className="delComment"
                    onClick={() => DeleteComment(id, comment?.id)}
                  >
                    <AiOutlineDelete />
                  </span>
                )}
                <Moment fromNow>{comment.data()?.time?.toDate()}</Moment>
              </p>
            </div>
          ))}
      </div>
      {/* add comment */}

      <form className="addPostForm" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Avatar src={user?.image} />
        </div>
        <input
          className="comment__post"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          className="sendCommnet"
          type="submit"
          disabled={!comment}
          onClick={handleClick}
        >
          <BiSend />
        </button>
      </form>
    </div>
  );
};

export default Post;
