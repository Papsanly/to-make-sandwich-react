import style from './TodoItem.module.css'
import {AnimatePresence, motion} from 'framer-motion'

function TodoButtons({id, text1, text2, showFirst=true, onClick1, onClick2}) {
  return (
    <div>
      <AnimatePresence>
        {showFirst &&
          <motion.button
            id={id}
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{type: 'tween', duration: 0.2}}
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
        data-done={!showFirst}
        onClick={onClick2}
      >
        {text2}
      </button>
    </div>
  )
}

function TodoData({text, date, done}) {
  return (
    <div style={{pointerEvents: "none"}}>
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
    <li id={id} className={style.todoItem} onClick={editValue === null  ? onClick : null}>
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
          <input id={id} value={editValue} onChange={onEditInputChange} className={style.editInput}/>
          <TodoButtons
            id={id}
            text1={'Save'}
            text2={'Cancel'}
            onClick1={onSaveButtonClick}
            onClick2={onCancelButtonClick}
          />
        </>
      }
    </li>
  )
}
