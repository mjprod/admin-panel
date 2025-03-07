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
  const color = categoryColorMap[category] || TagColor.All;

  const statusStyles: Record<QuestionCardStatus, string> = {
    [QuestionCardStatus.NeedApproval]: color,
    [QuestionCardStatus.PreApproved]: styles["badge-color-positive"],
    [QuestionCardStatus.Rejected]: checked
      ? styles["badge-color-negative"]
      : styles["badge-color-default"],
  };

  return (
    <div className={styles["question-group-container"]}>
      <QuestionStrengthTab languages={props.languages} />
      <div
        className={clsx(styles["question-group-main"], statusStyles[status])}
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
            color={color}
            currentlang={props.currentlang}
          />
          <SubcategorySection subcategories={props.subcategories} />
          <QuestionAnswerSection
            question={props.question}
            answer={props.answer}
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
