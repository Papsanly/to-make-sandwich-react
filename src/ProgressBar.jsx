import style from './ProgressBar.module.css'

export default function ProgressBar({progress}) {
  return (
    <div
      className={style.progressBar}
      style={{width: `${100 * progress}%`}}
    />
  )
}
