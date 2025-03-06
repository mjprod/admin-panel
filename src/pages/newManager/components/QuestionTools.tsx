import React from "react";
import Tag, { TagColor } from "../../../components/tags/Tag";
import styles from "./QuestionTools.module.css";

export interface CategoryProps {
  title: string;
  number: number;
  color: TagColor;
}

interface QuestionToolsProps {
  total: number;
  categories: CategoryProps[];
}

const QuestionTools: React.FC<QuestionToolsProps> = ({
  total,
  categories = [],
}) => {
  return (
    <div className={styles["tools-container"]}>
      <div className={styles["tools-heading"]}>Question Tools</div>

      <div className={styles["tag-container"]}>
        <div className={styles["row01"]}>
          <p>Total</p>
          <p>{total}</p>
        </div>
        <div className={styles["row02"]}>
          <p>Filter by Tag:</p>
          {categories.map((category) => (
            <Tag
              title={category.title}
              number={category.number}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTools;
