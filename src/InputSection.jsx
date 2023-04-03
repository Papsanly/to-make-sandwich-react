import style from './InputSection.module.css'
import { CalendarEventFill } from 'react-bootstrap-icons'
import { useEffect } from 'react'

export default function InputSection({
  inputValue,
  onInputChange,
  onInputKeyUp,
  onAddButtonClick,
  onDeadlineButtonClick
}) {
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight })
  }, [inputValue])

  return (
    <div className={style.inputSection}>
      <input
        placeholder={'What do u want to do?'}
        value={inputValue}
        onChange={onInputChange}
        onKeyUp={onInputKeyUp}
      />
      <button onClick={onDeadlineButtonClick}>
        <CalendarEventFill size={20} />
      </button>
      <button onClick={onAddButtonClick}>Add</button>
    </div>
  )
}
