import React, { useEffect } from 'react'
import Moment from "react-moment";
import { Avatar } from '@mui/material'
import {AiOutlineDelete} from "react-icons/ai"
const Comment = ({
  commentText , 
  userCommentImage,
  userCommentDisplayName,
  userCommentName,
  date, 
  user, 
  name , 
  DeleteComment,
  commentId,
  postId, }) => {

  return (
    <div className="comment" >
    <Avatar
      src={`${userCommentImage}`}
      sx={{ width: 30, height: 30, marginRight: "0.5rem" }}
      className="comment__avatar"
    />
    <p>{userCommentDisplayName|| userCommentName}</p>
    <p>{commentText}</p>
    <p>
      {(user?.name === name ||
        user?.name === userCommentName) && (
        <span
          className="delComment"
          onClick={() => DeleteComment(postId, commentId)}
        >
          <AiOutlineDelete />
        </span>
      )}
      <Moment fromNow>{date?.toDate()}</Moment>
    </p>
  </div>
  )
}

export default Comment


// key={comment?.data()?.time?.seconds}