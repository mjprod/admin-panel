import React from "react";
import "./Dialog.css";
import FAQSwapDemo from "./FAQSwapDemo";

export enum DialogStyle {
  Success,
  Error,
  Default,
}

interface Props {
  dialogStyle: DialogStyle;
  textTitle: string;
  textBody?: string;
  isShowing: boolean;
  setShowDialog: (isShowing: boolean) => void;
}

const Dialog: React.FC<Props> = ({
  dialogStyle,
  //textTitle,
  //textBody,
  isShowing,
  setShowDialog,
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
          <FAQSwapDemo />
          {/* SWAP BUTTON in the middle */}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
