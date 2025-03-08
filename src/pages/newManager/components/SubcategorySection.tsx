import React from "react";
import styles from "./SubcategorySection.module.css";
import Badge, { BadgeType } from "../../../components/badge/Badge";

const SubcategorySection: React.FC<{ subcategories: string[] }> = ({
  subcategories,
}) => (
  <div className={styles["subcategory-container"]}>
    {subcategories.map((subcategory, index) => (
      <Badge key={index} text={subcategory} type={BadgeType.subcategory} />
    ))}
  </div>
);

export default SubcategorySection