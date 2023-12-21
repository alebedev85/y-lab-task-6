import { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({
  title,
  exists,
  type,
  onChangeOpenFormComment,
  commentId,
  handleSubmit,
  placeholder
}) {

  const cn = bem('CommentForm');

  const [comment, setComment] = useState('');

  const [commentData, setCommentData] = useState();

  useEffect(() => {
    setCommentData(state => ({ ...state, text: comment, parent: { _id: commentId, _type: "comment" } }))
  }, [type, comment])

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(commentData);
    setComment('');
  }

  return (
    <>
      {exists ?
        <form onSubmit={onSubmit} className={cn()}>
          <span className={cn('title')}>{title}</span>
          <textarea
            className={cn('textarea')}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={placeholder}
          >
          </textarea>
          <div className={cn('buttons')}>
            <button className={cn('button', 'send')} type={'submit'}>Отправить</button>
            {type ? <button className={cn('button', 'cansel')} type={'button'} value={false} onClick={onChangeOpenFormComment}>Отмена</button> : null}
          </div>
        </form> :
        null
      }
    </>
  )
}

Comment.propTypes = {
  title: PropTypes.string,
  exists: PropTypes.bool,
  type: PropTypes.bool,
  onChangeOpenFormComment: PropTypes.func,
  commentId: PropTypes.string,
  handleSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

Comment.defaultProps = {
  label: 'Новый комментарий',
  type: false,
  placeholder: 'Текст',
  handleSubmit: () => {},
  onChangeOpenFormComment: () => {},
}

export default memo(CommentForm);
