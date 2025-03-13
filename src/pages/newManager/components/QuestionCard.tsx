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
import { Category } from "../../../util/ExampleData";
import { useTranslation } from "react-i18next";
import {
  KnowledgeStatus,
  KnowledgeCard,
} from "../../../api/responsePayload/KnowledgeResponse";
/* eslint-disable complexity */

const getCategoryColor = (category: Category) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(Colors.get(category.colorCode) || "white")
    .trim();
};

const getStatusStyles = (
  status: KnowledgeStatus,
  checked: boolean,
  categoryColor: string
) => {
  return {
    [KnowledgeStatus.NeedReview]: categoryColor,
    [KnowledgeStatus.PreApproved]: checked
      ? "badge-color-positive"
      : "badge-color-default",
    [KnowledgeStatus.Rejected]: checked
      ? "badge-color-negative"
      : "badge-color-default",
    [KnowledgeStatus.Approved]: checked
      ? "badge-color-positive"
      : "badge-color-default",
  }[status];
};

const QuestionCard: React.FC<KnowledgeCard> = ({
  id,
  dateTime,
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
  onSelected = () => {},
}) => {
  const { t } = useTranslation();
  const [isEditSelected, setEditSelected] = useState(false);
  const categoryColor = category?.colorCode || TagColor.ALL;

  const color = category ? getCategoryColor(category) : "white";

  const statusStyle = getStatusStyles(status, isSelected, categoryColor);

  const getSelectorProps = (
    status: KnowledgeStatus,
    isEdited: boolean,
    checked: boolean
  ) => {
    return status === KnowledgeStatus.Rejected
      ? {
          title: t("newManager.choose_to_delete"),
          type: SelectorType.Delete,
          checked: checked,
        }
      : {
          title: t("newManager.mark_to_save"),
          type: SelectorType.Write,
          isEdited: isEdited,
          checked: checked,
        };
  };

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
          status === KnowledgeStatus.NeedReview
            ? { backgroundColor: color }
            : undefined
        }
      >
        <div className={styles["question-container"]}>
          {status !== KnowledgeStatus.NeedReview && (
            <CardSelector
              {...selectorProps}
              onChecked={(checked) => {
                onSelected(conversationId, checked);
              }}
            />
          )}
          <Metadata
            date={dateTime}
            time={dateTime}
            conversationId={conversationId}
          />
          <CategorySection
            category={category ? category.name : ""}
            color={categoryColor}
            currentlang={currentlang}
          />
          {subcategories && (
            <SubcategorySection subcategories={subcategories} />
          )}
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
              (status !== KnowledgeStatus.NeedReview || isEditSelected) &&
                styles["preapproved"]
            )}
          >
            <ActionButtons
              status={status}
              isEditSelected={isEditSelected}
              setEditSelected={setEditSelected}
              id={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
