interface Props {
  error?: string
}

export const ErrorMessage = ({ error }: Props) => {
  if (!error) return null

  return (
    <div className="error-messsage">
      <p className="error-messsage__error">{error}</p>
    </div>
  )
}
