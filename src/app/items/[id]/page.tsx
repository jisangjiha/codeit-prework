"use client";

import CheckListDetail from "@/components/CheckListDetail";
import { useState } from "react";

import styles from "./page.module.css";
import checkboxEmpty from "@/assets/checkbox-empty.svg";
import checkboxFilled from "@/assets/checkbox-filled.svg";
import imgBackgoround from "@/assets/img.svg";
import fileAdd from "@/assets/fileAdd.svg";
import fileChange from "@/assets/fileChange.svg";
import Image from "next/image";
import Button from "@/components/Button";

export default function Page() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");

  const handleModify = () => {};
  const handleDelete = () => {};

  return (
    <div className={styles.container}>
      <CheckListDetail
        icon={isCompleted ? checkboxFilled : checkboxEmpty}
        title="내용 가져오기"
      />
      <div className={styles.formContainer}>
        <div className={styles.imageContainer}>
          {imageUrl || <Image src={imgBackgoround} alt={""} />}
          <label htmlFor="todoImage" className={styles.fileButton}>
            {imageUrl ? (
              <Image src={fileChange} alt={""} />
            ) : (
              <Image src={fileAdd} alt={""} />
            )}
          </label>
          <input id="todoImage" type="file" accept="image/*" />
        </div>
        <div className={styles.memoContainer}>
          <label htmlFor="todoMemo">Memo</label>
          <textarea
            id="todoMemo"
            className={styles.textarea}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.modifyButton}
          buttonContent="수정 완료"
          onClickButton={handleModify}
        />
        <Button
          className={styles.deleteButton}
          buttonContent="삭제하기"
          onClickButton={handleDelete}
        />
      </div>
    </div>
  );
}
