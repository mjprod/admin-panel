import React from "react";
import { Conversation } from "../../util/ExampleData";
import ConversationDetails from "./ConversationDetails";
import QuestionGroup from "./QuestionGroup";
import styles from "./Sidepage.module.css";

interface SidepageProps {
  selectedConversation: Conversation;
}

const Sidepage: React.FC<SidepageProps> = ({selectedConversation}) => {
  return (
    <main>
      <ConversationDetails title={"Conversation"} id={selectedConversation.id} date={selectedConversation.metadata.lastUpdated} category={selectedConversation.metadata.category} />
      <div className={styles["question-group-scroll-container"]}>
        <QuestionGroup conversation={selectedConversation}/>
      </div>
    </main>
  );
};

export default Sidepage;