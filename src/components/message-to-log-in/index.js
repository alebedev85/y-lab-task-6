import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';


function MessageToLogIn({ exists, type, onClick }) {
  const cn = bem('MessageToLogIn');

  return (
    <>
      {!exists ?
        <div className={cn()} >
          <Link className={cn('link')} to={'/login'}>Войдите</Link>, чтобы иметь возможность {type === 'false' ? 'комментировать.' : 'ответить.'}
          {type === 'false' ? null : <button type={'button'} value={false} className={cn('button')} onClick={onClick}>Отмена</button>}
        </div> :
        null
      }
    </>
  )
}

MessageToLogIn.propTypes = {
  exists: PropTypes.bool,
  type: PropTypes.string,
  onChangeLogInText: PropTypes.func,

};

export default memo(MessageToLogIn);