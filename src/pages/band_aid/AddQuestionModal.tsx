import React, { ChangeEvent, useState } from "react";
import "./AddQuestionModal.css";

interface QuestionData {
  question: string;
  answer: string;
}

interface AddQuestionViewProps {
  onSaved?: (data: QuestionData) => void;
  isModalAddQuestion: boolean;
  setIsModalAddQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuestionModal: React.FC<AddQuestionViewProps> = ({
  onSaved,
  isModalAddQuestion,
  setIsModalAddQuestion,
}) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSave = async () => {
    if (!question || !answer) {
      setError("Please fill in all fields!");
      return;
    }
    try {
      if (onSaved) {
        onSaved({
          question,
          answer,
        });
      }
    } catch {
      setError("Connection error. Please try again.");
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div>
      <div className={`add-question-view ${isModalAddQuestion ? "open" : ""}`}>
        <h2>New Question and Answer</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Question (Malay)"
          value={question}
          onChange={handleInputChange(setQuestion)}
        />
        <input
          type="text"
          placeholder="Answer (Malay)"
          value={answer}
          onChange={handleInputChange(setAnswer)}
        />
        <div className="view-buttons">
          <button
            className="cancel-button"
            onClick={() => setIsModalAddQuestion(false)}
          >
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
