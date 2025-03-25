import React from "react";
import styles from "./MaxList.module.css";
import MaxCard from "./MaxCard";

interface MaxList {}

const MaxList: React.FC<MaxList> = ({}) => {
  const list = [1, 2, 3, 4, 5];

  return (
    <div className={styles["question-group-scroll-container"]}>
      {list.map((con, index) => (
        <MaxCard key={index + con} />
      ))}
    </div>
  );
};

export default MaxList;
