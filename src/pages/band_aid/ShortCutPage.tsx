import React, { useEffect, useState } from "react";
import AddQuestionModal from "./AddQuestionModal";
import FullScreenModal from "./FullScreenModal";
import HistoryModalContent from "./HistoryModalContent";
import "./ShortCutPage.css";

interface ConversationItem {
  UserMsg?: string;
  AdminReply?: string;
}

interface ConversationHistory {
  Malay: ConversationItem[];
  Chinese: ConversationItem[];
}

interface QuestionItem {
  _id?: string;
  question: string;
  answer: string;
  question_cn: string;
  answer_cn: string;
  history: ConversationHistory;
}

const ShortCutPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [historySelected, setHistorySelected] = useState<
    ConversationHistory | undefined
  >(undefined);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://api.mjproapps.com/api/get_pre_brain/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token 4d4a50524f4432303232",
            },
          }
        );
        const data: QuestionItem[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("❌ Erro ao buscar perguntas:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handlePreApprove = (index: number, id: string) => {
    setSelectedIndex(index);
    setSelectedId(id);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      const res = await fetch(
        `https://api.mjproapps.com/api/delete_pre_brain/${id}/`,
        {
          method: "DELETE",
          headers: { Authorization: "Token 4d4a50524f4432303232" },
        }
      );
      if (res.ok) {
        setQuestions((prev) => prev.filter((item) => item._id !== id));
        if (selectedId === id) {
          setSelectedIndex(null);
          setSelectedId(null);
        }
      } else {
        const errorText = await res.text();
        console.error("Erro ao deletar:", errorText);
        alert("❌ Falha ao remover.");
      }
    } catch (err) {
      console.error("Erro de rede ao tentar deletar:", err);
    }
  };

  const handleAddToBrain = async () => {
    if (selectedIndex === null) return alert("Select first.");
    const selected = questions[selectedIndex];
    if (!selected) return;
    const payload = {
      question: selected.question,
      answer_en: selected.answer,
      answer_cn: selected.answer,
      answer_ms: selected.answer,
    };

    try {
      const res = await fetch("https://api.mjproapps.com/api/insert_brain/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 4d4a50524f4432303232",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok && selected._id) {
        await handleDelete(selected._id);
        setSelectedIndex(null);
        setSelectedId(null);
      } else {
        const error = await res.text();
        console.error("❌ Error:", error);
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  const editQuestion = (id: string) => {
    const newQuestion = prompt("Soalan baru:");
    if (!newQuestion) return;
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, question: newQuestion } : q))
    );
  };

  const editAnswer = (id: string) => {
    const newAnswer = prompt("Masukkan jawapan baharu:");
    if (!newAnswer) return;
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, answer: newAnswer } : q))
    );
  };

  const [isModalAddQuestion, setIsModalAddQuestion] = useState(false);

  const handleAddQuestion = () => setIsModalAddQuestion(true);

  const handleSavedQuestion = async (data: {
    question: string;
    answer: string;
  }) => {
    console.log("Saved question:", data.question);
    console.log("Saved answer:", data.answer);

    const payload = {
      question: data.question,
      answer_en: data.answer,
      answer_cn: data.answer,
      answer_ms: data.answer,
    };

    try {
      const res = await fetch("https://api.mjproapps.com/api/insert_brain/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 4d4a50524f4432303232",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsModalAddQuestion(false);
      } else {
        const error = await res.text();
        console.error("❌ Error:", error);
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="sap-main-container">
      <header className="header">
        <div className="notification-bar">
          <strong>注意：</strong>{" "}
          一旦確認答案後，它們將寫入Ai資料庫並且影響未來的回覆，請在確認前審慎評估。
        </div>
        <h1 className="title">Add to Ai Knowledge Base</h1>
        <button className="add-question-button" onClick={handleAddQuestion}>
          +
        </button>
      </header>
      {isModalAddQuestion && (
        <AddQuestionModal
          onSaved={handleSavedQuestion}
          isModalAddQuestion={isModalAddQuestion}
          setIsModalAddQuestion={setIsModalAddQuestion}
        />
      )}
      <main className="main-content">
        {questions.map((item, index) => (
          <div
            key={index}
            className={`question-card ${
              selectedIndex === index ? "selected" : ""
            }`}
          >
            <div className="row01">
              <span className="badge">MY</span>
              <span className="language">Malay</span>
              <button
                className="all-conversation-button"
                onClick={() => {
                  setShowModal(true);
                  setHistorySelected(item.history);
                }}
              >
                📜 所有对话
              </button>
            </div>
            <div className="qa-content">
              <p className="question-label">
                <strong>Soalan Pengguna:</strong> {item.question}
              </p>
              <p className="answer-label">
                <strong>Cadang Ai menjawab:</strong> {item.answer}
              </p>
            </div>
            <div className="qa-content">
              <p className="question-label">
                <strong>Soalan Pengguna:</strong> {item.question_cn}
              </p>
              <p className="answer-label">
                <strong>Cadang Ai menjawab:</strong> {item.answer_cn}
              </p>
            </div>
            <div className="actions">
              <button
                className="edit-button"
                onClick={() => editQuestion(item._id!)}
              >
                ✏️ Edit Soalan
              </button>
              <button
                className="edit-button"
                onClick={() => editAnswer(item._id!)}
              >
                ✏️ Kemas kini Jawapan
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id!)}
              >
                🗑️ Padam
              </button>
              <button
                className="approve-button"
                onClick={() => handlePreApprove(index, item._id!)}
              >
                ✅ Pra-Kelulusan
              </button>
            </div>
          </div>
        ))}
      </main>

      {selectedIndex !== null && (
        <div className="bottom-bar">
          <button className="shortcut" onClick={handleAddToBrain}>
            Add to Brain
          </button>
          <div className="warning">
            <strong>Warning:</strong> Permanently add to database
          </div>
        </div>
      )}

      <FullScreenModal isOpen={showModal} onClose={() => setShowModal(false)}>
        {historySelected ? (
          <HistoryModalContent history={historySelected} />
        ) : (
          <p>History not found.</p>
        )}
      </FullScreenModal>
    </div>
  );
};

export default ShortCutPage;
