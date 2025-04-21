interface ErrorHelperTextProps{
    message:string;
}

const ErrorHelperText = (props:ErrorHelperTextProps) => {
  return (
    <div className="error-text">{props?.message}</div>
  )
}

export default ErrorHelperText