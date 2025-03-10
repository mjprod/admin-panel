import React, { useState } from "react";
import Tag, { TagColor } from "../../../components/tags/Tag";
import styles from "./QuestionTools.module.css";

export interface CategoryProps {
  id: number;
  title: string;
  number: number;
  color: TagColor;
  isSelected?: boolean;
}

interface QuestionToolsProps {
  total: number;
  categories: CategoryProps[];
  onCategoryClick: (category: CategoryProps) => void;
}

const QuestionTools: React.FC<QuestionToolsProps> = ({
  total,
  categories = [],
  onCategoryClick,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Map<number, boolean>
  >(
    new Map(
      categories.map((category) => [category.id, category.isSelected || false])
    )
  );

  const toggleSelection = (category: CategoryProps) => {
    setSelectedCategories((prevState) => {
      const newState = new Map(prevState);
      newState.set(category.id, !newState.get(category.id));
      return newState;
    });
    onCategoryClick(category);
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
              isSelected={selectedCategories.get(category.id) || false}
              onClick={() => toggleSelection(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTools;
