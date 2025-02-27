import ConversationDetails from "./ConversationDetails";
import QuestionGroup from "./QuestionGroup";
import styles from "./Sidepage.module.css";

const Sidepage = () => {
  return (
    <main>
      <ConversationDetails />
      <div className={styles["question-group-scroll-container"]}>
        <QuestionGroup />
      </div>
    </main>
  );
};

export default Sidepage;