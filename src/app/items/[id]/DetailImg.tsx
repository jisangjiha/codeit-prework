import Image from "next/image";
import imgBackgoround from "@/assets/img.svg";
import fileAdd from "@/assets/fileAdd.svg";
import fileChange from "@/assets/fileChange.svg";
import styles from "@/app/items/[id]/page.module.css";

interface DetailImgProps {
  imageUrl: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DetailImg({
  imageUrl,
  handleImageUpload,
}: DetailImgProps) {
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
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}
