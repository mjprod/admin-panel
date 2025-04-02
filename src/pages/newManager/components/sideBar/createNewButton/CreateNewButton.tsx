import React, { useState } from "react";
import styles from "./CreateNewButton.module.css";
import AssetsPack from "../../../../../util/AssetsPack";
import CustomButton, {
  ButtonType,
} from "../../../../../components/button/CustomButton";
import { useTranslation } from "react-i18next";
import { CreateKnowledge } from "../../../../../api/apiCalls";
import CategorySection from "../../sideMain/maxPanel/CategorySection";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { fetchConversations } from "../../../../../store/slice/conversation.slice";
import { fetchKnowledgeSummary } from "../../../../../store/slice/category.slice";

const CreateNewButton = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSubSelectedCategory] = useState<number>(0);
  const {language} = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  const changeFormState = (state?: boolean) => {
    state ? setFormVisible(state) : setFormVisible(!isFormVisible);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setFormVisible(false);

    await CreateKnowledge(
      selectedCategory,
      selectedSubCategory,
      language.id,
      question,
      answer
    );

    dispatch(fetchConversations())
    dispatch(fetchKnowledgeSummary());
    setAnswer("");
    setQuestion("");
  };

  const InputContainer = (
    placeholder: string,
    text: string,
    setText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  ) => {
    return (
      <div className={styles["input-container"]}>
        {/* Input Field */}
        <textarea
          value={text}
          onChange={setText}
          className={styles["input"]}
          autoFocus
          onFocus={(e) => e.target.select()}
          rows={4}
          style={{ resize: "vertical" }}
          placeholder={placeholder}
        />
      </div>
    );
  };

  const { t } = useTranslation();

  return (
    <div className={styles["mainContainer"]}>
      <button
        className={styles["createNewButton"]}
        onClick={() => !isFormVisible && changeFormState(true)}
      >
        <div className={styles["iconContainer"]}>
          <img
            className={styles["icon"]}
            src={AssetsPack.icons.ICON_CREATE_NEW.default}
          />
          <span>{t("createNewButton.create_new")}</span>
        </div>
        <img
          onClick={() => changeFormState()}
          className={styles["icon"]}
          src={
            !isFormVisible
              ? AssetsPack.icons.ICON_PLUS.default
              : AssetsPack.icons.ICON_CLOSE.default
          }
        />
      </button>
      {isFormVisible && (
        <div className={styles["formSection"]}>
          {InputContainer(
            t("createNewButton.question"),
            question,
            handleQuestionChange
          )}
          {InputContainer(
            t("createNewButton.answer"),
            answer,
            handleAnswerChange
          )}

          <div className={styles["bottomSection"]}>
            <CategorySection
              setSelectedCategory={setSelectedCategory}
              setSubSelectedCategory={setSubSelectedCategory}
            />
          </div>

          <CustomButton
            text={t("createNewButton.submit")}
            type={ButtonType.Submit}
            onClick={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default CreateNewButton;
