import React from 'react';
import CommentCard from './CommentCard';

const CommentsList = (props) => {
  const { sortedComments, user, deleteComment } = props;
  return (
    <ul>
      {sortedComments.map(comment => {
        return <CommentCard comment={comment} user={user} deleteComment={deleteComment} key={comment._id} />
      })}
    </ul>
  );
};

export default CommentsList;