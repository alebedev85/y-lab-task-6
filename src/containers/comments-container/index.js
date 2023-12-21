import { memo, useState } from "react";
import Comment from "../../components/comment";
import { generatorCommentsList } from "../../utils/comments-list";
import Spinner from '../../components/spinner';
import TitleComment from "../../components/title-comment";
import CommentLogIn from "../../components/comment-log-in";
import useSelector from "../../hooks/use-selector";
import CommentForm from "../../components/comment-form";
import { useDispatch } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";

function CommentsContainer({ comments, idArticle }) {

  const exists = useSelector(state => state.session.exists);

  const [openLogInText, setOpenLogInText] = useState('false');
  const [openFormComment, setOpenFormComment] = useState('false');
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    profile: state.session.user.profile?.name
  }));

  const onChangeLogInText = (e) => {
    setOpenLogInText(e.target.value);
  }

  const onChangeOpenFormComment = (e) => {
    setOpenFormComment(e.target.value);
  }

  const postFormComment = (data) => {
    if (!data.parent._id) {
      dispatch(commentsActions.postComments({ ...data, parent: { _id: idArticle, _type: "article" } }, select.profile))
    } else {
      dispatch(commentsActions.postComments(data, select.profile))
      setOpenFormComment('false');
    }
  }

  const newCommentsList = generatorCommentsList(comments, idArticle)
    .map(item => {
      return item.map((item2, i) => {
        return (
          <Comment
            key={item2._id}
            id={item2._id}
            // user={item2.author.profile.name}
            date={item2.dateCreate}
            text={item2.text}
            indent={((i + 1) * 30) + 10}
            openLogInText={openLogInText}
            onChangeLogInText={onChangeLogInText}
            exists={exists}
            onChangeOpenFormComment={onChangeOpenFormComment}
            openFormComment={openFormComment}
            hand2={postFormComment}
          />
        )
      })
    }).flatMap(item => item)

  return (
    <Spinner active={select.commentsWaiting}>
      <TitleComment count={comments.length} />
      {newCommentsList.map(item => item)}
      {
        openLogInText === 'false' ? <CommentLogIn exists={exists} type={openLogInText} /> : null
      }
      {
        openFormComment === 'false' ? <CommentForm exists={exists} title={'Новый комментарий'} hand={postFormComment} /> : null
      }
    </Spinner>
  )
}

export default memo(CommentsContainer);