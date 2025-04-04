import Image from "next/image";
import imgBackgoround from "@/assets/img.svg";
import fileAdd from "@/assets/fileAdd.svg";
import fileChange from "@/assets/fileChange.svg";
import styles from "@/app/items/[id]/page.module.css";

interface DetailImgProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function DetailImg({ imageUrl, setImageUrl }: DetailImgProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 파일명 영어 검사
      const isEnglishFilename = /^[a-zA-Z0-9_\-\.]+$/.test(file.name);
      if (!isEnglishFilename) {
        alert("파일명은 영어만 사용 가능합니다.");
        return;
      }

      // 파일 크기 제한
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("파일 크기는 5MB 이하만 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.imageContainer}>
      {imageUrl ? (
        <img
          className={styles.uploadedImg}
          src={imageUrl}
          alt="업로드된 이미지"
        />
      ) : (
        <Image src={imgBackgoround} alt="업로드 전 배경 이미지" />
      )}
      <label htmlFor="todoImage" className={styles.fileButton}>
        {imageUrl ? (
          <Image src={fileChange} alt={"이미지 변경"} />
        ) : (
          <Image src={fileAdd} alt={"이미지 추가"} />
        )}
      </label>
      <input
        id="todoImage"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
