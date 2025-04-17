interface InputErrorProps {
  errorMessage: string;
}

const InputError = ({ errorMessage }: InputErrorProps) => {
  return <small className="text-textPrimaryRed  text-xs">{errorMessage}</small>;
};

export default InputError;
