import { memo } from "react";
import PropTypes from 'prop-types';
import CommentLogIn from "../comment-log-in";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from "../comment-form";

function Comment({ user, date, text, indent, id, openLogInText, onChangeLogInText, exists, onChangeOpenFormComment, openFormComment, hand2 }) {
  const cn = bem('Comment');

  const dataDate = new Date(date)

  const changeDate = {
    date: dataDate.getDate(),
    month: dataDate.toLocaleString('default', { month: 'long' }),
    year: dataDate.getFullYear(),
    hours: dataDate.getHours(),
    minutes: dataDate.getMinutes()
  }

  const onChangeHandler = (e) => {
    if (!exists) onChangeLogInText(e);
    else if (exists) onChangeOpenFormComment(e);
  }

  return (
    <div style={{ marginLeft: `${indent}px` }}>
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <p className={cn('user')}>{user}</p>
          <p className={cn('date')}>
            {
              `${changeDate.date} ${changeDate.month} ${changeDate.year} в ${changeDate.hours}:${changeDate.minutes}`
            }
          </p>
        </div>
        <p className={cn('text')}>{text}</p>
        <button value={id} className={cn('button')} type='button' onClick={onChangeHandler}>Ответить</button>
        {openLogInText === id ? <CommentLogIn exists={exists} onChangeLogInText={onChangeLogInText} /> : null}
        {openFormComment === id ?
          <CommentForm
            title={'Новый ответ'}
            exists={exists} indent={indent}
            type={true}
            onChangeOpenFormComment={onChangeOpenFormComment}
            commentId={id}
            hand={hand2}
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
  onChangeLogInText: PropTypes.func,
  exists: PropTypes.bool,
  openLogInText: PropTypes.string
};

export default memo(Comment);