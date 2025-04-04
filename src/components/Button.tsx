import styles from "./Button.module.css";

import Image from "next/image";
import plus from "@/assets/plus.svg";
import plusWhite from "@/assets/plus-white.svg";
import check from "@/assets/check.svg";
import x from "@/assets/X.svg";
interface ButtonProps {
  className: string;
  icon: "plus" | "check" | "x";
  buttonContent: string;
  onClickButton: any;
  hasChanges?: boolean;
}

// 아이콘 선택 로직
const getIcon = (icon: ButtonProps["icon"], hasChanges?: boolean) => {
  switch (icon) {
    case "plus":
      return hasChanges ? plusWhite : plus;
    case "check":
      return check;
    case "x":
      return x;
  }
};

// 클래스 선택 로직
const getButtonClass = (icon: ButtonProps["icon"], hasChanges?: boolean) => {
  const base = styles.button;
  switch (icon) {
    case "plus":
      return `${base} ${styles.add} ${hasChanges ? styles.hasChanges : ""}`;
    case "check":
      return `${base} ${styles.modify} ${hasChanges ? styles.hasChanges : ""}`;
    case "x":
      return `${base} ${styles.delete}`;
  }
};

export default function Button({
  className,
  icon,
  buttonContent,
  onClickButton,
  hasChanges,
}: ButtonProps) {
  const buttonClass = getButtonClass(icon, hasChanges);
  const iconSrc = getIcon(icon, hasChanges);

  return (
    <button className={`${buttonClass} ${className}`} onClick={onClickButton}>
      <Image src={iconSrc} alt={buttonContent} />
      <div>{buttonContent}</div>
    </button>
  );
}
