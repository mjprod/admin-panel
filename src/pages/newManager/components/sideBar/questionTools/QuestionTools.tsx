import React, { useState } from "react";
import Tag from "../../../../../components/tags/Tag";
import styles from "./QuestionTools.module.css";
import { useTranslation } from "react-i18next";
import { ColorTagDetails } from "../../../../../util/ExampleData";
import { useAppDispatch } from "../../../../../store/hooks";
import { toggleCategory } from "../../../../../store/slice/category.slice";

export interface CategoryProps {
  id: number;
  title: string;
  number: number;
  color: ColorTagDetails;
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
  const dispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState<
    Map<number, boolean>
  >(
    new Map(
      categories.map((category) => [category.id, category.isSelected || false])
    )
  );

  const toggleSelection = (category: CategoryProps) => {
    if (category.id == 0) {
      category.isSelected = true;
      return;
    }
    setSelectedCategories((prevState) => {
      const newState = new Map(prevState);
      newState.set(category.id, !newState.get(category.id));
      return newState;
    });
    dispatch(toggleCategory(category));
  };

  const {t} = useTranslation();

  return (
    <div className={styles["tools-container"]}>
      <div className={styles["tools-heading"]}>{t("newManager.question_tools")}</div>

      <div className={styles["tag-container"]}>
        <div className={styles["row01"]}>
          <p>{t("newManager.total")}</p>
          <p>{total}</p>
        </div>
        <div className={styles["row02"]}>
          <p>{t("newManager.filter_by_tag")}</p>
          {categories.map((category) => (
            <Tag
              key={category.id}
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
