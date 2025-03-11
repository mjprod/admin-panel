import React, { useState } from "react";
import styles from "./QuestionCard.module.css";
import clsx from "clsx";
import QuestionStrengthTab from "../../../components/language/QuestionStrengthTab";
import { TagColor } from "../../../components/tags/Tag";
import CardSelector, { SelectorType } from "../../../components/CardSelector";
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
  isEdited?: boolean;
  isSelected?: boolean;
  onSelected?: (conversationId: string, checked: boolean) => void;
}

const getCategoryColor = (category: Category) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(Colors.get(category.colorCode) || "white")
    .trim();
};

const getStatusStyles = (
  status: QuestionStatus,
  checked: boolean,
  categoryColor: string
) => {
  return {
    [QuestionStatus.NeedApproval]: categoryColor,
    [QuestionStatus.PreApproved]: checked
      ? "badge-color-positive"
      : "badge-color-default",
    [QuestionStatus.Rejected]: checked
      ? "badge-color-negative"
      : "badge-color-default",
  }[status];
};

const getSelectorProps = (status: QuestionStatus, isEdited: boolean, checked: boolean) => {
  return status === QuestionStatus.Rejected
    ? { title: "Pilih untuk dipadam", type: SelectorType.Delete, checked: checked }
    : {
      title: "Tandakan untuk Menyimpan",
      type: SelectorType.Write,
      isEdited: isEdited,
      checked: checked,
    };
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
  isEdited = false,
  isSelected = false,
  onSelected = () => { },
}) => {
  const [isEditSelected, setEditSelected] = useState(false);
  const categoryColor = category.colorCode || TagColor.ALL;

  const color = getCategoryColor(category);

  const statusStyle = getStatusStyles(status, isSelected, categoryColor);
  const selectorProps = getSelectorProps(status, isEdited, isSelected);

  const handleEditChange = (updatedQuestion: string, updatedAnswer: string) => {
    console.log(updatedQuestion, updatedAnswer);
  };

  return (
    <div className={clsx(styles["question-group-container"])}>
      <QuestionStrengthTab languages={languages} />
      <div
        className={clsx(
          styles["question-group-main"],
          isEditSelected && styles["qc-editing-mode"],
          statusStyle
        )}
        style={
          status === QuestionStatus.NeedApproval
            ? { backgroundColor: color }
            : undefined
        }
      >
        <div className={styles["question-container"]}>
          {status !== QuestionStatus.NeedApproval && (
            <CardSelector {...selectorProps} onChecked={(checked) => { onSelected(conversationId, checked) }} />
          )}
          <Metadata date={date} time={time} conversationId={conversationId} />
          <CategorySection
            category={category.title}
            color={categoryColor}
            currentlang={currentlang}
          />
          <SubcategorySection subcategories={subcategories} />
          <QuestionAnswerSection
            question={question}
            answer={answer}
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
