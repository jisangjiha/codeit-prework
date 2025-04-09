// 상세 페이지에서 이미지 업로드

import { useEffect, useRef, useState } from "react";
import { uploadImage } from "@/api";

import Image from "next/image";
import imgBackground from "@/assets/img.svg";
import fileAdd from "@/assets/fileAdd.svg";
import fileChange from "@/assets/fileChange.svg";
import styles from "@/app/items/[id]/page.module.css";

interface DetailImgProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  setIsUploading: (uploading: boolean) => void;
}

export default function DetailImg({
  imageUrl,
  setImageUrl,
  setIsUploading,
}: DetailImgProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 사용자가 고른 첫 번째 파일만 사용
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 이름 체크 (영문, 숫자, 일부 특수문자만 허용)
    const fileNameValid = /^[a-zA-Z0-9_.-]+$/.test(file.name);
    if (!fileNameValid) {
      alert("이미지 파일 이름은 영어, 숫자, _, .,- 만 사용할 수 있습니다.");
      return;
    }

    // 파일 크기 체크 (5MB = 5 * 1024 * 1024 바이트)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 미리보기용 URL 설정
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    // 로딩 상태 체크용 - 업로드 중 창 밖으로 나가기 방지
    setIsUploading(true);

    // 서버 업로드
    uploadImage(file)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((err) => {
        alert("이미지 업로드에 실패했습니다.");
        console.error(err);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={styles.imageContainer}>
      {previewUrl ? (
        <Image
          className={styles.uploadedImg}
          src={previewUrl}
          alt="업로드된 이미지"
          fill
        />
      ) : (
        <Image
          className={styles.imgBackground}
          src={imgBackground}
          alt="기본 배경 이미지"
        />
      )}
      <label
        className={styles.fileButton}
        htmlFor="todoImage"
        onClick={handleImageClick}
      >
        {imageUrl ? (
          <Image src={fileChange} alt={"이미지 변경"} />
        ) : (
          <Image src={fileAdd} alt={"이미지 추가"} />
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
