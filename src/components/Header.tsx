import Image from "next/image";
import Link from "next/link";

import mainLogo from "../assets/main-logo.svg";
import miniLogo from "../assets/logo.svg";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <Image className={styles.mainLogo} src={mainLogo} alt={""} />
        <Image className={styles.miniLogo} src={miniLogo} alt={""} />
      </Link>
    </header>
  );
}
