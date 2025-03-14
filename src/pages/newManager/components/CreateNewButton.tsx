import React, { useState } from "react";
import styles from "./CreateNewButton.module.css";
import AssetsPack from "../../../util/AssetsPack";
import FilterSelect from "../../../components/dropDown/FilterSelect";
import CustomButton, {
  ButtonType,
} from "../../../components/button/CustomButton";
import { useTranslation } from "react-i18next";
import { useConversationsContext } from "../../../context/ConversationProvider";
import { CreateKnowledge } from "../../../api/auth";
import { DEFAULT_LANGUAGE_ID } from "../../../api/contants";

const CreateNewButton = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const { categories, subCategories } = useConversationsContext();

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSubSelectedCategory] = useState<number>(0);

  const changeFormState = (state?: boolean) => {
    console.log("state----", state);
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

    console.log(
      "categories----",
      answer,
      question,
      selectedCategory,
      selectedSubCategory
    );

    const res = await CreateKnowledge(
      selectedCategory,
      selectedSubCategory,
      DEFAULT_LANGUAGE_ID,
      question,
      answer
    );

    console.log("Create new res----", res);
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
          <span>{t("newManager.create_new")}</span>
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
          {InputContainer("Question...", question, handleQuestionChange)}
          {InputContainer("Answer...", answer, handleAnswerChange)}

          <div className={styles["bottomSection"]}>
            <FilterSelect
              hint="Select Category"
              options={categories}
              onChange={setSelectedCategory}
            />
            <FilterSelect
              hint="Sub Category"
              options={subCategories}
              onChange={setSubSelectedCategory}
            />
          </div>

          <CustomButton
            text={"Submit"}
            type={ButtonType.Submit}
            onClick={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default CreateNewButton;
