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
  handleCommentSubmit
}) {
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
    <div style={{ marginLeft: `${level * 30}px` }}>
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <span className={cn('user')}>{user}</span>
          <span className={cn('date')}>
            {
              `${commentDate.date} ${commentDate.month} ${commentDate.year} в ${commentDate.hours}:${commentDate.minutes}`
            }
          </span>
        </div>
        <span className={cn('text')}>{text}</span>
        <button value={id} className={cn('button')} type='button' onClick={onChangeHandler}>Ответить</button>
      </div>
      {openMessageToLogIn === id ? <MessageToLogIn exists={exists} onClick={onChangeMessageToLogIn} /> : null}
      {openFormComment === id ?
        <CommentForm
          title={'Новый ответ'}
          exists={exists}
          type={true}
          onChangeOpenFormComment={onChangeOpenFormComment}
          commentId={id}
          handleSubmit={handleCommentSubmit}
          placeholder={`Мой ответ для ${user}`}
        />
        : null}

    </div>
  )
}

Comment.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  level: PropTypes.number,
  id: PropTypes.string,
  openMessageToLogIn: PropTypes.string,
  onChangeMessageToLogIn: PropTypes.func,
  exists: PropTypes.bool,
  onChangeOpenFormComment: PropTypes.func,
  openFormComment: PropTypes.string,
  handleCommentSubmit: PropTypes.func,
};

export default memo(Comment);