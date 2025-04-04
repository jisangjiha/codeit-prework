import styles from "@/app/items/[id]/page.module.css";

interface DetailMemoProps {
  memo: string;
  onChangeMemo: (value: string) => void;
}

export default function DetailMemo({ memo, onChangeMemo }: DetailMemoProps) {
  return (
    <div className={styles.memoContainer}>
      <label htmlFor="todoMemo">Memo</label>
      <textarea
        id="todoMemo"
        className={styles.textarea}
        value={memo}
        onChange={(e) => onChangeMemo(e.target.value)}
        placeholder="메모를 입력하세요"
      />
    </div>
  );
}
