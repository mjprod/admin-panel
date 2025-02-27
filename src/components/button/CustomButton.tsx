import React from "react";
import styles from "./CustomButton.module.css";
import clsx from "clsx";
import AssetsPack from "../../util/AssetsPack";

export enum ButtonType {
  Approve = "Approve",
  Reject = "Reject",
  Normal = "Normal",
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
        return AssetsPack.icons.ICON_CLOSE.default;
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
      {icon && <img src={`${icon}`} />}
      {text}
    </button>
  );
};

export default CustomButton;
