import "./index.scss"

export default function Loading({ showLoading = false }) {
  if (!showLoading) return null
  return (
    <>
      <div className="loader-container"></div>
      <div className="loader-spinner-container">
        <span className="loader-spinner"></span>
      </div>
    </>
  )
}
