import React, { useEffect, useState } from "react";
import styles from "./MaxCard.module.css";
import Metadata from "../questionList/components/metaData/Metadata";
import ChatHistoryButton from "../questionList/components/chatHistoryButton/ChatHistoryButton";
import QuestionAnswerSection from "../questionList/components/questionAnswerSection/QuestionAnswerSection";
import clsx from "clsx";
import CustomButton, {
  ButtonType,
} from "../../../../../components/button/CustomButton";
import { useTranslation } from "react-i18next";
import FilterSelect from "../../../../../components/dropDown/FilterSelect";
import { Category, SubCategory } from "../../../../../util/ExampleData";
import { useConversationsContext } from "../../../../../context/ConversationProvider";

interface MaxCard {}

const MaxCard: React.FC<MaxCard> = ({}) => {
  const { t } = useTranslation();
  const { categories, subCategories } = useConversationsContext();

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSubSelectedCategory] = useState<number>(0);

  const [subCategoryOptions, setSubCategoryOptions] =
    useState<SubCategory[]>(subCategories);
  const [categoryOptions, setCategoryOptions] =
    useState<Category[]>(categories);

  const handleReject = () => {};

  useEffect(() => {
    setSubCategoryOptions(subCategories);
    setCategoryOptions(categories);
  }, [categories, subCategories]);

  useEffect(() => {
    if (selectedCategory == 0) {
      setSubCategoryOptions(subCategories);
    } else {
      const filteredSubs = subCategories.filter(
        (sub) => sub.category == selectedCategory
      );
      setSubCategoryOptions(filteredSubs);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory != 0) {
      const selected = subCategories.find(
        (sub) => sub.id === selectedSubCategory
      );
      const selectedCat = categories.filter(
        (cat) => cat.id == selected?.category
      );
      if (selectedCategory == 0 || selectedCategory != selected?.category) {
        setCategoryOptions(selectedCat ?? categories);
      }
    } else {
      setCategoryOptions(categories);
    }
  }, [selectedSubCategory]);

  const questionAnswerCard = (
    <div className={styles["question-answer-container-view"]}>
      <input
        className={clsx(styles["styled-checkbox"], styles["align-checkbox"])}
        type="checkbox"
        checked={true}
        onChange={() => {}}
      />
      <div className={styles["question-answer-sub-con"]}>
        <QuestionAnswerSection
          question={"Could you please investigate why my deposit is missing?"}
          answer={
            "Give it another 5 minutes, and then see if the funds have appeared"
          }
          isEditing={false}
          onChange={() => {}}
          color={"#fff"}
          classNameStyle={styles["remove-padding"]}
        />
      </div>
    </div>
  );

  return (
    <div className={styles["question-group-scroll-container"]}>
      <div className={styles["question-group-container"]}>
        <div className={styles["question-group-main"]}>
          <div className={styles["question-strength-tab"]}>
            <input
              type="checkbox"
              className={styles["styled-checkbox"]}
              checked={true}
              onChange={() => {}}
            />
            <label>{"Background"}</label>
          </div>
          <div className={styles["question-container"]}>
            <Metadata
              date={"2025-03-21T05:38:23.484456Z"}
              time={"2025-03-21T05:38:23.484456Z"}
              conversationId={"159c3640-200a-4bdc-bbeb-85a9b83eb0d2"}
            />

            <div className={styles["question-chat-history"]}>
              <ChatHistoryButton
                conversationData={{
                  conversationId: "",
                  date_time: "2025-03-21T05:38:23.484456Z",
                  chat_data: [],
                }}
              />
            </div>

            <div className={styles["category-container"]}>
              <FilterSelect
                hint={t("createNewButton.category")}
                options={categoryOptions}
                onChange={setSelectedCategory}
                classNameStyle={styles["category_view"]}
              />
              <FilterSelect
                hint={t("createNewButton.subcategory")}
                options={subCategoryOptions}
                onChange={setSubSelectedCategory}
                classNameStyle={styles["category_view"]}
              />
            </div>

            {questionAnswerCard}

            {questionAnswerCard}

            {questionAnswerCard}

            {questionAnswerCard}

            <div className={styles["buttons-container"]}>
              <CustomButton
                text={t("newManager.reject")}
                type={ButtonType.Reject}
                onClick={handleReject}
              />
              <div className={styles["buttons-sub-container"]}>
                <CustomButton
                  text={"Regenerate"}
                  type={ButtonType.Regenerate}
                  onClick={handleReject}
                />
                <CustomButton
                  text={t("newManager.approved")}
                  type={ButtonType.Approve}
                  onClick={handleReject}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxCard;
