import React from "react";
import styles from "./CustomButton.module.css";
import clsx from "clsx";
import AssetsPack from "../../util/AssetsPack";

export enum ButtonType {
  Approve = "Approve",
  Reject = "Reject",
  Normal = "Normal",
  Submit = "Submit",
  Edit = "Edit",
  Return = "Return",
  Delete = "Delete",
  Cancel = "Cancel",
  Done = "Done",
}

type ButtonProps = {
  type?: ButtonType;
  text: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  disabled?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({
  type = ButtonType.Normal,
  text,
  onClick,
  disabled = false,
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (onClick) {
      onClick(e);
    }
  };

  const getIcon = (type: ButtonType) => {
    switch (type) {
      case ButtonType.Approve:
        return AssetsPack.icons.ICON_TICK.default;
      case ButtonType.Reject:
      case ButtonType.Delete:
        return AssetsPack.icons.ICON_CLOSE.default;
      case ButtonType.Edit:
        return AssetsPack.icons.ICON_EDIT.default;
      case ButtonType.Return:
        return AssetsPack.icons.ICON_RETURN.default;
      case ButtonType.Cancel:
        return AssetsPack.icons.ICON_CANCEL.default;
      case ButtonType.Done:
        return AssetsPack.icons.ICON_SAVE.default;
      default:
        return null;
    }
  };

  const icon = getIcon(type);

  const getButtonStyle = (type: ButtonType) => {
    switch (type) {
      case ButtonType.Approve:
        return styles["pre-approve"];
      case ButtonType.Reject:
        return styles["reject"];
      case ButtonType.Submit:
        return styles["submit"];
      case ButtonType.Edit:
        return styles["edit"];
      case ButtonType.Return:
        return styles["return"];
      case ButtonType.Delete:
        return styles["dismiss"];
      case ButtonType.Cancel:
        return styles["cancel-edit"];
      case ButtonType.Done:
        return styles["submit-edit"];
      default:
        return styles["normal"];
    }
  };

  const buttonClass = clsx(
    styles["button"],
    getButtonStyle(type),
    disabled && styles["disabled"]
  );

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      {icon && <img className={styles["image"]} src={`${icon}`} />}
      {text}
    </button>
  );
};

export default CustomButton;
