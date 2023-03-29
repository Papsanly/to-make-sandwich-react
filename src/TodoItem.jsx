import style from './TodoItem.module.css'
import {motion, AnimatePresence} from 'framer-motion'

function TodoButtons({id, text1, text2, showFirst=true, onClick1, onClick2}) {
  return (
    <div className={style.todoButtons} data-show-first={showFirst}>
      <AnimatePresence>
        {showFirst &&
          <motion.button
            id={id}
            initial={{x: '100%'}}
            animate={{x: showFirst ? 0 : '100%'}}
            exit={{x: '100%'}}
            transition={{duration: 0.2, ease: 'backInOut'}}
            className={style.edit}
            onClick={onClick1}
          >
            {text1}
          </motion.button>
        }
      </AnimatePresence>
      <button
        id={id}
        className={style.delete}
        onClick={onClick2}
      >
        {text2}
      </button>
    </div>
  )
}

function TodoData({text, date, done}) {
  return (
    <div className={style.todoData}>
      <span
        className={style.text}
        style={{textDecoration: done ? "line-through" : "none"}}
      >
        {text}
      </span>
      <span className={style.date}>
        {new Date(date).toLocaleString()}
      </span>
    </div>
  )
}

export default function TodoItem(
  {
    id, text, date, done, editValue, onClick,
    onDeleteButtonClick, onEditButtonClick,
    onSaveButtonClick, onCancelButtonClick,
    onEditInputChange
  }
) {
  return (
    <motion.li
      id={id}
      className={style.todoItem}
      onClick={editValue === null  ? onClick : null}
    >
      {editValue === null ?
        <>
          <TodoData {...{text, date, done}}/>
          <TodoButtons
            id={id}
            text1={'Edit'}
            text2={'Delete'}
            showFirst={!done}
            onClick1={onEditButtonClick}
            onClick2={onDeleteButtonClick}
          />
        </>
        :
        <>
          <input
            id={id}
            value={editValue}
            onChange={onEditInputChange}
            className={style.editInput}
          />
          <TodoButtons
            id={id}
            text1={'Save'}
            text2={'Cancel'}
            onClick1={onSaveButtonClick}
            onClick2={onCancelButtonClick}
          />
        </>
      }
    </motion.li>
  )
}
