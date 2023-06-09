import style from './ProgressBar.module.css'

export default function ProgressBar({ progress }) {
  let RGBArray1 = [238, 132, 215].map(x => progress * x)
  let RGBArray2 = [142, 223, 252].map(x => (1 - progress) * x)
  let RGBArray = Array.from({ length: 3 }).map(
    (_, index) => RGBArray1[index] + RGBArray2[index]
  )

  return (
    <div className={style.progressBarBackground}>
      <div
        data-progress={progress}
        className={style.progressBar}
        style={{
          width: `calc(${100 * progress}% - 10px)`,
          background: `rgb(${RGBArray})`
        }}
      />
    </div>
  )
}
