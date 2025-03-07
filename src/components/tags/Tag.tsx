import React from "react";
import clsx from "clsx";
import styles from "./Tag.module.css";

export enum TagColor {
  Thrdparty = "badge-color01",
  FourDLotto = "badge-color02",
  Account = "badge-color03",
  Feedback = "badge-color04",
  Finance = "badge-color05",
  PointsShop = "badge-color06",
  Referral = "badge-color07",
  Security = "badge-color08",
  Technology = "badge-color09",
  All = "all-tag"
}

interface TagProps {
  title: string;
  number?: number;
  color?: TagColor;
}

const Tag: React.FC<TagProps> = ({
  title,
  number,
  color = TagColor.All,
}) => {
  return (
    <div className={clsx(styles["tag"], styles[color])}>
      {title} {number !== undefined && number !== null ? `| ${number}` : ""}
    </div>
  );
};

export default Tag;
