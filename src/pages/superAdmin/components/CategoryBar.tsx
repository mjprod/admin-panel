import React from "react";
import styles from "./CategoryBar.module.css";
import clsx from "clsx";

interface CategoryBarProps {
  title: string;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ title }: CategoryBarProps) => {
  return (
    <div className={clsx(styles["category-seperator-banner"], styles["badge-color09"])}>
      <div className={clsx(styles["badge"], styles["badge-color09"])}>{title}</div>
    </div>
  );
};

export default CategoryBar;
