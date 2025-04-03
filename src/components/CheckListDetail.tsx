import { Todo } from "@/types";
import styles from "./CheckListDetail.module.css";
import Image from "next/image";

interface CheckListDetailProps {
  icon: any;
  title: string;
}

export default function CheckListDetail({ icon, title }: CheckListDetailProps) {
  return (
    <div className={styles.detailContainer}>
      <Image src={icon} alt={""} />
      <span>{title}</span>
    </div>
  );
}
