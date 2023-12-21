import './style.css';

import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

function CommentsList({ count, children }) {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      <span className={cn('title')}>{`Коментарии (${count})`}</span>
      {children}
    </div>
  )
}

CommentsList.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.number,
};

export default CommentsList;