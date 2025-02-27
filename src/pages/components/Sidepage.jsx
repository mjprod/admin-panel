import ConversationDetails from "./ConversationDetails";
import QuestionGroup from "./QuestionGroup";

const Sidepage = () => {
  return (
    <div>
      <ConversationDetails />
      <div className="question-group-scroll-container">
        <QuestionGroup />
      </div>
    </div>
  );
};

export default Sidepage;