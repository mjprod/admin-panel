import React from "react";
import { Conversation } from "../../util/ExampleData";
import ConversationDetails from "./ConversationDetails";
import QuestionGroup from "./QuestionGroup";
import styles from "./Sidepage.module.css";

interface SidepageProps {
  selectedConversation: Conversation;
  index: number;
}

const Sidepage: React.FC<SidepageProps> = ({ selectedConversation, index }) => {
  return (
    <main>
      <ConversationDetails
        title={`Conversation ${index + 1}`}
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
    </main>
  );
};

export default Sidepage;
