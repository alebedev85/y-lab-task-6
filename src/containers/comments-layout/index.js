import { memo, useState } from "react";
import PropTypes from 'prop-types';
import Comment from "../../components/comment";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import CommentsList from '../../components/comments-list'
import MessageToLogIn from "../../components/message-to-log-in";
import useSelector from "../../hooks/use-selector";
import CommentForm from "../../components/comment-form";
import { useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from 'react-redux';
import commentsActions from "../../store-redux/comments/actions";

function CommentsLayout({ articleId }) {

  const [openMessageToLogIn, setOpenMessageToLogIn] = useState('false');
  const [openFormComment, setOpenFormComment] = useState('false');

  const exists = useSelector(state => state.session.exists);

  const dispatch = useDispatchRedux();

  useInit(() => {
    dispatch(commentsActions.loadComments(articleId))
  }, [articleId]);

  const select = useSelectorRedux((state) => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
  }));

  const onChangeMessageToLogIn = (e) => {
    setOpenMessageToLogIn(e.target.value);
  }

  const onChangeOpenFormComment = (e) => {
    setOpenFormComment(e.target.value);
  }

  const handleCommentSubmit = (data) => {
    if (!data.parent._id) {
      dispatch(commentsActions.postComments({ ...data, parent: { _id: articleId, _type: "article" } }, select.profile))
    } else {
      dispatch(commentsActions.postComments(data, select.profile))
      setOpenFormComment('false');
    }
  }

  const commentsList = treeToList(listToTree(select.comments), (item, level) => ({
    _id: item._id,
    text: item.text,
    dateCreate: item.dateCreate,
    author: item.author,
    parent: item.parent,
    isDeleted: item.isDeleted,
    level: level - 1,
  })).slice(1)

  return (
    <Spinner active={select.waiting}>
      <CommentsList
        count={select.comments.length}
      >
        {commentsList.map((comment) =>
          <Comment
            key={comment._id}
            id={comment._id}
            user={comment.author.profile.name}
            date={comment.dateCreate}
            text={comment.text}
            level={comment.level}
            openMessageToLogIn={openMessageToLogIn}
            onChangeMessageToLogIn={onChangeMessageToLogIn}
            exists={exists}
            onChangeOpenFormComment={onChangeOpenFormComment}
            openFormComment={openFormComment}
            handleCommentSubmit={handleCommentSubmit}
          />)}
        {
          openMessageToLogIn === 'false' ? <MessageToLogIn
            exists={exists}
            type={openMessageToLogIn} /> : null
        }
        {
          openFormComment === 'false' ? <CommentForm
            exists={exists}
            title={'Новый комментарий'} hand={handleCommentSubmit} /> : null
        }
      </CommentsList>
    </Spinner>
  )
}

CommentsLayout.propTypes = {
  articleId: PropTypes.string.isRequired,

};

export default memo(CommentsLayout);