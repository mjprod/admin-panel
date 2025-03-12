import React from "react";
import styles from "./SubcategorySection.module.css";
import Badge, { BadgeType } from "../../../components/badge/Badge";
import { SubCategory } from "../../../util/ExampleData";

const SubcategorySection: React.FC<{ subcategories: SubCategory }> = ({
  subcategories,
}) => (
  <div className={styles["subcategory-container"]}>
    <Badge text={subcategories.title} type={BadgeType.subcategory} />
  </div>
);

export default SubcategorySection;
