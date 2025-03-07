import React, { useEffect, useState } from "react";
import styles from "./DeleteCardSelector.module.css";

interface DeleteCardSelectorProps {
  onChecked: (checked: boolean) => void;
}

const DeleteCardSelector: React.FC<DeleteCardSelectorProps> = ({
  onChecked,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onChecked(checked);
  }, [checked, onChecked]);

  return (
    <div className={styles["delete-card-selector"]}>
      <input
        type="checkbox"
        id="select-for-delete"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="select-for-delete">Pilih untuk dipadam</label>
    </div>
  );
};

export default DeleteCardSelector;
