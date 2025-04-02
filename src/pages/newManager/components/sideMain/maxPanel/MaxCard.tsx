import React, { useState } from "react";
import styles from "./MaxCard.module.css";
import Metadata from "../questionList/components/metaData/Metadata";
import ChatHistoryButton from "../questionList/components/chatHistoryButton/ChatHistoryButton";
import CustomButton, {
  ButtonType,
} from "../../../../../components/button/CustomButton";
import { useTranslation } from "react-i18next";

interface MaxCard {}

const MaxCard: React.FC<MaxCard> = ({}) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSubSelectedCategory] = useState<number>(0);
  const [checked, setChecked] = useState(false);

  const data = [{

  }]

  const handleReject = () => {
    console.log(selectedCategory, selectedSubCategory)
  };

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <div className={styles["question-group-scroll-container"]}>
      <div className={styles["question-group-container"]}>
        <div className={styles["question-group-main"]}>
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

            {

            }

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
