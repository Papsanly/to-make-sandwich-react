import style from './InputSection.module.css'
import { useEffect } from 'react'

export default function InputSection({
  inputValue,
  deadlineValue,
  onInputChange,
  onInputKeyUp,
  onAddButtonClick,
  onDeadlineChange
}) {
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight })
  }, [inputValue])

  return (
    <div className={style.inputSection}>
      <input
        className={style.textInput}
        placeholder={'What do u want to do?'}
        value={inputValue}
        onChange={onInputChange}
        onKeyUp={onInputKeyUp}
      />
      <input
        className={style.deadlineInput}
        data-deadline={deadlineValue !== ''}
        type="datetime-local"
        onChange={onDeadlineChange}
        value={deadlineValue}
      />
      <button onClick={onAddButtonClick}>Add</button>
    </div>
  )
}
