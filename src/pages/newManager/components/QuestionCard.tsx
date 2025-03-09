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
import { QuestionStatus } from "../../../util/QuestionStatus";
import { Category } from "../../../util/ExampleData";

export interface QuestionCardProps {
  date: string;
  time: string;
  conversationId: string;
  category: Category;
  languages: any[];
  currentlang: any;
  subcategories: string[];
  question: string;
  answer: string;
  status: QuestionStatus;
}

// const categoryColorMap: Record<string, TagColor> = {
//   Account: TagColor.Account,
//   Technology: TagColor.Technology,
//   "4D": TagColor.FourDLotto,
// };

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const { status, category } = props;
  const [checked, setChecked] = useState(false);
  const [isEditSelected, setEditSelected] = useState(false);
  const categoryColor = category.colorCode || TagColor.ALL;

  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(Colors.get(category.colorCode) || "white")
    .trim();

  const statusStyles: Record<QuestionStatus, string> = {
    [QuestionStatus.NeedApproval]: categoryColor,
    [QuestionStatus.PreApproved]: "badge-color-positive",
    [QuestionStatus.Rejected]: checked
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
          statusStyles[status]
        )}
        style={
          status === QuestionStatus.NeedApproval
            ? { backgroundColor: color }
            : undefined
        }
      >
        <div className={styles["question-container"]}>
          {status === QuestionStatus.Rejected && (
            <DeleteCardSelector onChecked={setChecked} />
          )}
          <Metadata
            date={props.date}
            time={props.time}
            conversationId={props.conversationId}
          />
          <CategorySection
            category={props.category.title}
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
              (status !== QuestionStatus.NeedApproval || isEditSelected) &&
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
