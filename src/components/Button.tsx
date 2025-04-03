interface ButtonProps {
  className: string;
  buttonContent: string;
  onClickButton: any;
}
export default function Button({
  className,
  buttonContent,
  onClickButton,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClickButton}>
      {buttonContent}
    </button>
  );
}
