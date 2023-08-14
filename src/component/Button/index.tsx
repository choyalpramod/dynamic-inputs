import "./index.scss"
import { ButtonType } from "@src/types"

export const Button: React.FC<{
  btnType?: ButtonType.button | ButtonType.submit
  label: string
  onClickCallback?: () => void
  isPrimaryBtn?: boolean
  isVisible?: boolean
}> = ({
  btnType = ButtonType.button,
  label,
  onClickCallback = () => {},
  isPrimaryBtn = false,
  isVisible = true,
}) => {
  if (!isVisible) return null

  const getClassName = () => {
    if (isPrimaryBtn) {
      return "steps-navigation-btn--primary"
    }
    return "steps-navigation-btn"
  }
  return (
    <button className={getClassName()} type={btnType} onClick={onClickCallback}>
      {label}
    </button>
  )
}
