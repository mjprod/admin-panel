import React from "react";
import styles from "./Dialog.module.css";
import SimilarFaq from "./SimilarFaq";
import clsx from "clsx";
import AssetsPack from "../../util/AssetsPack";

export enum DialogStyle {
  Success,
  Error,
  Default,
}

export enum DialogShownFromType {
  Context,
  NeedApproval,
}

interface Props {
  dialogStyle: DialogStyle;
  id: number;
  question: string;
  answer?: string;
  isShowing: boolean;
  setShowDialog: (isShowing: boolean) => void;
  dialogShownFromType: DialogShownFromType
}

const Dialog: React.FC<Props> = ({
  dialogStyle,
  id,
  question,
  answer,
  isShowing,
  setShowDialog,
  dialogShownFromType
}) => {
  const closeDialog = () => {
    setShowDialog(false);
  };

  const getColorClass = () => {
    switch (dialogStyle) {
      case DialogStyle.Success:
        return styles["dialog-success"];
      case DialogStyle.Error:
        return styles["dialog-error"];
      default:
        return styles["dialog-default"];
    }
  };

  if (!isShowing) return null;

  return (
    <div className={styles["dialog-wrapper"]} onClick={closeDialog}>
      <div
        className={clsx(styles["dialog-box"], getColorClass())}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["dialog-close-icon"]} onClick={closeDialog}>
          <img src={AssetsPack.icons.ICON_CLOSE.default} className={styles.closeIcon} />
        </button>
        <div className={styles["dialog-content"]}>
          <SimilarFaq
            dialogShownFromType={dialogShownFromType}
            question={question}
            answer={answer}
            id={id}

          />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
