import React, { useState } from "react";
import styles from "./QuestionCard.module.css";
import QuestionStrengthTab from "../../../components/language/QuestionStrengthTab";
import CustomButton, {
  ButtonType,
} from "../../../components/button/CustomButton";
import Badge, { BadgeType } from "../../../components/badge/Badge";
import Language, { LanguageProps } from "../../../components/language/Language";
import clsx from "clsx";
import { TagColor } from "../../../components/tags/Tag";
import DeleteCardSelector from "../../../components/DeleteCardSelector";

export enum QuestionCardStatus {
  NeedApproval,
  PreApproved,
  Rejected,
}

export interface QuestionCardProps {
  date: string;
  time: string;
  conversationId: string;
  category: string;
  languages: LanguageProps[];
  currentlang: LanguageProps;
  subcategories: string[];
  question: string;
  answer: string;
  status: QuestionCardStatus;
}

const categoryColorMap: Record<string, TagColor> = {
  Account: TagColor.Account,
  Technology: TagColor.Technology,
  "4D": TagColor.FourDLotto,
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  date,
  time,
  conversationId,
  category,
  languages,
  currentlang,
  subcategories,
  question,
  answer,
  status,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditSelected, setEditSelected] = useState(false);

  const handleEdit = () => {
    if (isEditSelected) {
      setEditSelected(false);
    } else {
      setEditSelected(true);
    }
  };

  const handlePreApprove = () => {
    if (isEditSelected) {
      setEditSelected(false);
    } else {
    }
  };

  const handleReject = () => {};

  const handleReturn = () => {};

  const handleDelete = () => {};

  const color = categoryColorMap[category] || TagColor.All;

  const statusStyles: Record<QuestionCardStatus, string> = {
    [QuestionCardStatus.NeedApproval]: color,
    [QuestionCardStatus.PreApproved]: styles["badge-color-positive"],
    [QuestionCardStatus.Rejected]: checked
      ? styles["badge-color-negative"]
      : styles["badge-color-default"],
  };

  const renderButtons = () => {
    if (status === QuestionCardStatus.NeedApproval) {
      return (
        <>
          {!isEditSelected && (
            <CustomButton
              text="Tolak"
              type={ButtonType.Reject}
              onClick={handleReject}
            />
          )}
          <div className={styles["rightcol-buttons"]}>
            <CustomButton
              text={isEditSelected ? "Keluar dari Mod Edit" : "Sunting"}
              type={isEditSelected ? ButtonType.Cancel : ButtonType.Edit}
              onClick={handleEdit}
            />
            <CustomButton
              text={isEditSelected ? "Simpan & Pralulus" : "Pra-Kelulusan"}
              type={isEditSelected ? ButtonType.Done : ButtonType.Approve}
              onClick={handlePreApprove}
            />
          </div>
        </>
      );
    }

    const buttonConfig: Partial<
      Record<
        QuestionCardStatus,
        { text: string; type: ButtonType; onClick: () => void }
      >
    > = {
      [QuestionCardStatus.PreApproved]: {
        text: 'Kembali kepada "memerlukan kelulusan"',
        type: ButtonType.Return,
        onClick: handleReturn,
      },
      [QuestionCardStatus.Rejected]: {
        text: "Padamkan secara kekal",
        type: ButtonType.Delete,
        onClick: handleDelete,
      },
    };

    return buttonConfig[status] ? (
      <CustomButton {...buttonConfig[status]} />
    ) : null;
  };

  return (
    <div className={styles["question-group-container"]}>
      <QuestionStrengthTab languages={languages} />
      <div
        className={clsx(styles["question-group-main"], statusStyles[status])}
      >
        <div className={styles["question-container"]}>
          {status === QuestionCardStatus.Rejected && (
            <DeleteCardSelector onChecked={setChecked} />
          )}
          <div className={styles["question-metadata"]}>
            <p>
              {date} | {time}
            </p>
            <p>Conversation ID: {conversationId}</p>
          </div>
          <div className={styles["language"]}>
            <Badge text={category} color={color} />
            <div className={styles["rightcol"]}>
              <Language {...currentlang} />
            </div>
          </div>
          <div className={styles["subcategory-container"]}>
            {subcategories.map((subcategory, index) => (
              <Badge
                key={index}
                text={subcategory}
                type={BadgeType.subcategory}
              />
            ))}
          </div>
          <div className={styles["question-answer-container"]}>
            <div className={styles["question-block-container"]}>
              <p className={styles["question-title"]}>Soalan Pengguna: </p>
              <p>{question}</p>
            </div>
            <div className={styles["answer-block-container"]}>
              <p className={styles["answer-title"]}>Cadang Ai menjawab: </p>
              <p>{answer}</p>
            </div>
          </div>
          <div
            className={clsx(
              styles["question-button-actions"],
              status !== QuestionCardStatus.NeedApproval ||
                (isEditSelected && styles["preapproved"])
            )}
          >
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
