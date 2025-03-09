import React from "react";
import clsx from "clsx";
import styles from "./Tag.module.css";

// export enum TagColor {
//   Thrdparty = "badge-color01",
//   FourDLotto = "badge-color02",
//   Account = "badge-color03",
//   Feedback = "badge-color04",
//   Finance = "badge-color05",
//   PointsShop = "badge-color06",
//   Referral = "badge-color07",
//   Security = "badge-color08",
//   Technology = "badge-color09",
//   All = "all-tag"
// }

export enum TagColor {
  PINK = "badge-color01",
  GOLDISH = "badge-color02",
  PURPLE = "badge-color03",
  BROWN = "badge-color04",
  GREEN = "badge-color05",
  NAVY_BLUE = "badge-color06",
  AQUA = "badge-color07",
  RED = "badge-color08",
  COBALT = "badge-color09",
  ALL = "all-tag",
}

interface TagProps {
  title: string;
  number?: number;
  color?: TagColor;
  isSelected?: boolean;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({
  title,
  number,
  color = TagColor.ALL,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        styles["tag"],
        styles[color],
        !isSelected ? styles["not-selected"] : styles["selected"]
      )}
      onClick={onClick}
    >
      {title} {number !== undefined && number !== null ? `| ${number}` : ""}
    </div>
  );
};

export default Tag;
