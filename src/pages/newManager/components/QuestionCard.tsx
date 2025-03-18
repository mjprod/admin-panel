import React, { useState } from "react";
import styles from "./QuestionCard.module.css";
import clsx from "clsx";
import QuestionStrengthTab from "../../../components/language/QuestionStrengthTab";
import CardSelector, { SelectorType } from "../../../components/CardSelector";
import Metadata from "./Metadata";
import CategorySection from "./CategorySection";
import SubcategorySection from "./SubcategorySection";
import QuestionAnswerSection from "./QuestionAnswerSection";
import ActionButtons from "./ActionButtons";
import { ColorTagDetails } from "../../../util/ExampleData";
import { useTranslation } from "react-i18next";
import {
  KnowledgeStatus,
  KnowledgeCard,
} from "../../../api/responsePayload/KnowledgeResponse";
import ChatHistoryButton from "./ChatHistoryButton";
/* eslint-disable complexity */


const getStatusStyles = (
  status: KnowledgeStatus,
  checked: boolean,
  categoryColor: ColorTagDetails | undefined
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
  const [updatedQuestion, setUpdatedQuestion] = useState(question);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);

  const categoryColor: ColorTagDetails = category?.colorDetails
    ? category?.colorDetails
    : { borderColor: "#fff", lightColor: "#fff", darkColor: "#000" };

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
    setUpdatedAnswer(updatedAnswer);
    setUpdatedQuestion(updatedQuestion);
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
            ? {
                backgroundColor: categoryColor?.lightColor,
                borderColor: categoryColor?.borderColor,
                color: categoryColor?.darkColor,
              }
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
          <ChatHistoryButton />
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
            color={categoryColor.lightColor}
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
              updatedQuestion={updatedQuestion}
              updatedAnswer={updatedAnswer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
