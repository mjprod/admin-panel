import React from "react";
import styles from "./Metadata.module.css";
import {
  utcToLocalDate,
  utcToLocalTime,
} from "../../../../../../../util/ExtensionFunction";

const Metadata: React.FC<{
  date?: string;
  time?: string;
  text?: string;
}> = ({ date, time, text }) => {

  return (
    <div className={styles["question-metadata"]}>
      {date && time && (
        <p>
          {utcToLocalDate(date)} | {utcToLocalTime(time)}
        </p>
      )}
      <p>
        {text}
      </p>
    </div>
  );
};

export default Metadata;
