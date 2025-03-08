import React, { useState } from "react";
import styles from "./QuestionCard.module.css";
import clsx from "clsx";
import QuestionStrengthTab from "../../../components/language/QuestionStrengthTab";
import { TagColor } from "../../../components/tags/Tag";
import DeleteCardSelector from "../../../components/DeleteCardSelector";
import Metadata from "./Metadata";
import CategorySection from "./CategorySection";
import SubcategorySection from "./SubcategorySection";
import QuestionAnswerSection from "./QuestionAnswerSection";
import ActionButtons from "./ActionButtons";
import Colors from "../../../util/Colors";

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
  languages: any[];
  currentlang: any;
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

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const { status, category } = props;
  const [checked, setChecked] = useState(false);
  const [isEditSelected, setEditSelected] = useState(false);
  const categoryColor = categoryColorMap[category] || TagColor.All;

  const color = getComputedStyle(document.documentElement)
      .getPropertyValue(Colors.get(category) || "white")
      .trim();

  const statusStyles: Record<QuestionCardStatus, string> = {
    [QuestionCardStatus.NeedApproval]: categoryColor,
    [QuestionCardStatus.PreApproved]: "badge-color-positive",
    [QuestionCardStatus.Rejected]: checked
      ? "badge-color-negative"
      : "badge-color-default",
  };

  const handleEditChange = (updatedQuestion: string, updatedAnswer: string) => {
    console.log(updatedQuestion, updatedAnswer);
  };

  return (
    <div className={clsx(styles["question-group-container"])}>
      <QuestionStrengthTab languages={props.languages} />
      <div
        className={clsx(
          styles["question-group-main"],
          isEditSelected && styles["qc-editing-mode"],
          statusStyles[status],
        )}
        style={{backgroundColor: color}}
      >
        <div className={styles["question-container"]}>
          {status === QuestionCardStatus.Rejected && (
            <DeleteCardSelector onChecked={setChecked} />
          )}
          <Metadata
            date={props.date}
            time={props.time}
            conversationId={props.conversationId}
          />
          <CategorySection
            category={props.category}
            color={categoryColor}
            currentlang={props.currentlang}
          />
          <SubcategorySection subcategories={props.subcategories} />
          <QuestionAnswerSection
            question={props.question}
            answer={props.answer}
            isEditing={isEditSelected}
            onChange={handleEditChange}
            color={color}
          />
          <div
            className={clsx(
              styles["question-button-actions"],
              (status !== QuestionCardStatus.NeedApproval || isEditSelected) &&
                styles["preapproved"]
            )}
          >
            <ActionButtons
              status={status}
              isEditSelected={isEditSelected}
              setEditSelected={setEditSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
