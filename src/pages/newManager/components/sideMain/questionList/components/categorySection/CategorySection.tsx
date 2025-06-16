import React from "react";
import styles from "./CategorySection.module.css";
import Badge from "../../../../../../../components/badge/Badge";
import { ColorTagDetails } from "../../../../../../../util/ExampleData";

const CategorySection: React.FC<{
  category: string;
  color: ColorTagDetails;
}> = ({ category, color }) => (
  <div className={styles["language"]}>
    <Badge text={category} color={color} />
  </div>
);

export default CategorySection;
