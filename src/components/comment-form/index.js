import { memo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentForm({title, exists, type = false, onChangeOpenFormComment, commentId, hand}) {

  const cn = bem('CommentForm');

  const [valueArea, setValueArea] = useState('');

  const [reqParams, setReqParams] = useState();

  useEffect(() => {
    setReqParams(state => ({...state, text: valueArea, parent: {_id: commentId, _type: "comment"}}))
  }, [type, valueArea])

  const postData = (e) => {
    e.preventDefault();
    hand(reqParams);
    setValueArea('');
  }

  return (
    <>
      {exists ?
        <form onSubmit={postData} className={cn()} style={type ? {marginLeft: '0px'} : {marginLeft: '40px'}}>
          <p className={cn('title')}>{title}</p>
          <textarea
            className={cn('textarea')}
            value={valueArea}
            onChange={e => setValueArea(e.target.value)}
          >
      </textarea>
          <div className={cn('wrapper')}>
            <button className={cn('send')} type={'submit'}>Отправить</button>
            {type ? <button className={cn('cansel')} type={'button'} value={false} onClick={onChangeOpenFormComment}>Отмена</button> : null}
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
};

export default memo(CommentForm);
