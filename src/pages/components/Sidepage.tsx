import React from "react";
import { Conversation } from "../../util/ExampleData";
import ConversationDetails from "./ConversationDetails";
import QuestionGroup from "./QuestionGroup";
import styles from "./Sidepage.module.css";
import CustomButton from "../../components/button/CustomButton";

interface SidepageProps {
  selectedConversation: Conversation;
}

const Sidepage: React.FC<SidepageProps> = ({ selectedConversation }) => {
  const handleUpdate = () => {

  };

  return (
    <main>
      <ConversationDetails
        title={`Conversation ${selectedConversation.id}`}
        id={selectedConversation.id}
        date={selectedConversation.metadata.lastUpdated}
        category={selectedConversation.metadata.category}
      />
      <div className={styles["question-group-scroll-container"]}>
        <QuestionGroup
          key={selectedConversation.id}
          conversation={selectedConversation}
        />
      </div>
      <CustomButton text="Update" onClick={handleUpdate}/>
    </main>
  );
};

export default Sidepage;
