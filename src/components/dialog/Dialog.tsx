import React from "react";
import "./Dialog.css";
import SimilarFaq from "./SimilarFaq";

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
  //const [isSwapped, setIsSwapped] = useState(false);

  const closeDialog = () => {
    setShowDialog(false);
  };

  const getColorClass = () => {
    switch (dialogStyle) {
      case DialogStyle.Success:
        return "dialog-success";
      case DialogStyle.Error:
        return "dialog-error";
      default:
        return "dialog-default";
    }
  };

  if (!isShowing) return null;

  return (
    <div className="dialog-wrapper" onClick={closeDialog}>
      <button className="dialog-close-icon" onClick={closeDialog}>
        ✖
      </button>
      <div
        className={`dialog-box ${getColorClass()}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-content">
          <SimilarFaq
            dialogShownFromType={dialogShownFromType}
            question={question}
            answer={answer}
            id={id}

          />
          {/* SWAP BUTTON in the middle */}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
