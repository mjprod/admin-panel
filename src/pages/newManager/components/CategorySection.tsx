import React from "react";
import styles from "./CategorySection.module.css";
import Badge from "../../../components/badge/Badge";
import Language from "../../../components/language/Language";
import { TagColor } from "../../../components/tags/Tag";

const CategorySection: React.FC<{
  category: string;
  color: TagColor;
  currentlang: any;
}> = ({ category, color, currentlang }) => (
  <div className={styles["language"]}>
    <Badge text={category} color={color} />
    <div className={styles["rightcol"]}>
      <Language {...currentlang} />
    </div>
  </div>
);

export default CategorySection;
