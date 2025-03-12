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
  KnowledegeStatus,
  KnowledgeCard,
} from "../../../api/responsePayload/KnowledgeResponse";
/* eslint-disable complexity */

const getCategoryColor = (category: Category) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(Colors.get(category.colorCode) || "white")
    .trim();
};

const getStatusStyles = (
  status: KnowledegeStatus,
  checked: boolean,
  categoryColor: string
) => {
  return {
    [KnowledegeStatus.NeedReview]: categoryColor,
    [KnowledegeStatus.PreApproved]: checked
      ? "badge-color-positive"
      : "badge-color-default",
    [KnowledegeStatus.Rejected]: checked
      ? "badge-color-negative"
      : "badge-color-default",
    [KnowledegeStatus.Approved]: checked
      ? "badge-color-positive"
      : "badge-color-default",
  }[status];
};

const QuestionCard: React.FC<KnowledgeCard> = ({
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
    status: KnowledegeStatus,
    isEdited: boolean,
    checked: boolean
  ) => {
    return status === KnowledegeStatus.Rejected
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
          status === KnowledegeStatus.NeedReview
            ? { backgroundColor: color }
            : undefined
        }
      >
        <div className={styles["question-container"]}>
          {status !== KnowledegeStatus.NeedReview && (
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
            category={category ? category.title : ""}
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
              (status !== KnowledegeStatus.NeedReview || isEditSelected) &&
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
