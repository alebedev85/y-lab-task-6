import { memo } from "react";
import PropTypes from 'prop-types';
import MessageToLogIn from "../message-to-log-in";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from "../comment-form";

function Comment({
  user,
  date,
  text,
  level,
  id,
  openMessageToLogIn,
  onChangeMessageToLogIn,
  exists,
  onChangeOpenFormComment,
  openFormComment,
  handleCommentSubmit }) {
  const cn = bem('Comment');

  const newDate = new Date(date)

  const commentDate = {
    date: newDate.getDate(),
    month: newDate.toLocaleString('default', { month: 'long' }),
    year: newDate.getFullYear(),
    hours: newDate.getHours(),
    minutes: newDate.getMinutes()
  }

  const onChangeHandler = (e) => {
    if (!exists) onChangeMessageToLogIn(e);
    else if (exists) onChangeOpenFormComment(e);
  }

  return (
    <div style={{ marginLeft: `${level*30}px` }}>
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <p className={cn('user')}>{user}</p>
          <p className={cn('date')}>
            {
              `${commentDate.date} ${commentDate.month} ${commentDate.year} в ${commentDate.hours}:${commentDate.minutes}`
            }
          </p>
        </div>
        <p className={cn('text')}>{text}</p>
        <button value={id} className={cn('button')} type='button' onClick={onChangeHandler}>Ответить</button>
        {openMessageToLogIn === id ? <MessageToLogIn exists={exists} onClick={onChangeMessageToLogIn} /> : null}
        {openFormComment === id ?
          <CommentForm
            title={'Новый ответ'}
            exists={exists}
            type={true}
            onChangeOpenFormComment={onChangeOpenFormComment}
            commentId={id}
            handleSubmit={handleCommentSubmit}
          />
          : null}
      </div>
    </div>
  )
}

Comment.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  indent: PropTypes.number,
  id: PropTypes.string,
  onChangeMessageToLogIn: PropTypes.func,
  exists: PropTypes.bool,
  openMessageToLogIn: PropTypes.string
};

export default memo(Comment);