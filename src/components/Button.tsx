import Image from "next/image";
import check from "@/assets/check.svg";
import x from "@/assets/X.svg";
interface ButtonProps {
  className: string;
  checkOrX: boolean;
  buttonContent: string;
  onClickButton: any;
}
export default function Button({
  className,
  checkOrX,
  buttonContent,
  onClickButton,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClickButton}>
      {checkOrX ? <Image src={check} alt={""} /> : <Image src={x} alt={""} />}
      <div>{buttonContent}</div>
    </button>
  );
}
