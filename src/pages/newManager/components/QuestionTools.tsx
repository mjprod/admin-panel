import React, { useState } from "react";
import Tag, { TagColor } from "../../../components/tags/Tag";
import styles from "./QuestionTools.module.css";

export interface CategoryProps {
  title: string;
  number: number;
  color: TagColor;
  isSelected?: boolean;
}

interface QuestionToolsProps {
  total: number;
  categories: CategoryProps[];
}

const QuestionTools: React.FC<QuestionToolsProps> = ({
  total,
  categories = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Map<string, boolean>
  >(
    new Map(
      categories.map((category) => [
        category.title,
        category.isSelected || false,
      ])
    )
  );

  const toggleSelection = (title: string) => {
    setSelectedCategories((prevState) => {
      const newState = new Map(prevState);
      newState.set(title, !newState.get(title));
      return newState;
    });
  };

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
              key={category.title}
              title={category.title}
              number={category.number}
              color={category.color}
              isSelected={selectedCategories.get(category.title) || false}
              onClick={() => toggleSelection(category.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTools;
