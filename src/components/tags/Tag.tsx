import React from "react";
import clsx from "clsx";
import styles from "./Tag.module.css";
import { ColorTagDetails } from "../../util/ExampleData";

interface TagProps {
  title: string;
  number?: number;
  color?: ColorTagDetails;
  isSelected?: boolean;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({
  title,
  number,
  color = {
    borderColor: "#fff",
    lightColor: "#fff",
    darkColor: "#fff",
  },
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        styles["tag"],
        !isSelected ? styles["not-selected"] : styles["selected"]
      )}
      style={{
        backgroundColor: color.lightColor,
        borderColor: color.borderColor,
        color: color.darkColor,
      }}
      onClick={onClick}
    >
      {title} {number !== undefined && number !== null ? `| ${number}` : ""}
    </div>
  );
};

export default Tag;
