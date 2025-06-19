import PropTypes from "prop-types";
import { useState } from "react";

// ========== STYLES ==========
const styles = {
  container: {
    background: "#efefefb3",
    borderRadius: "1rem",
    boxShadow: "0 2px 12px #0002",
    border: "1px solid #fff",
    margin: "40px auto",
    padding: "2rem",
    width: "70vw",
    minWidth: "400px",
    maxWidth: "900px",
    fontFamily: "Inter, sans-serif",
  },
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    padding: "2rem",
    marginBottom: "2rem",
    gap: "2rem",
  },
  badge: {
    background: "#0b55d4",
    color: "#fff",
    borderRadius: "2rem",
    fontWeight: 600,
    padding: "0.5rem 1.5rem",
    marginRight: "1.5rem",
    fontSize: "1rem",
  },
  qa: { flex: 1 },
  actionCol: { display: "flex", flexDirection: "column", gap: "1rem" },
  confirm: {
    background: "#d2fad7",
    color: "#144421",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: 500,
    fontSize: "1rem",
    padding: "0.75rem 1.5rem",
    cursor: "pointer",
  },
  reject: {
    background: "#fae0e0",
    color: "#b23c3c",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: 500,
    fontSize: "1rem",
    padding: "0.75rem 1.5rem",
    cursor: "pointer",
  },
  warningBox: {
    background:
      "repeating-linear-gradient(135deg,#eae49b,#fbf3b2 20px,#eae49b 40px)",
    borderRadius: "8px",
    padding: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    fontWeight: 500,
    border: "1px solid #eae49b",
  },
  warningInner: {
    background: "#fff",
    borderRadius: "8px",
    padding: "2rem",
  },
  warningTitle: {
    color: "#b99a0a",
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  warningText: {
    color: "#666",
    marginBottom: "2rem",
  },
  warningActions: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
  },
  cancel: {
    border: "2px solid #444",
    background: "#fff",
    color: "#222",
    borderRadius: "0.5rem",
    fontWeight: 500,
    fontSize: "1rem",
    padding: "0.75rem 2rem",
    cursor: "pointer",
  },
  swapBtn: {
    display: "block",
    margin: "0 auto 2rem auto",
    background: "#dedede",
    border: "1px solid #999",
    color: "#444",
    padding: "0.3rem 1.3rem",
    fontSize: "1.2rem",
    borderRadius: "1.5rem",
    cursor: "pointer",
  },
  // Danger styles
  dangerBox: {
    background:
      "repeating-linear-gradient(135deg, #fba3a0, #fa6b6b 20px, #fba3a0 40px)",
    borderRadius: "8px",
    border: "2px solid #fa6b6b",
    marginBottom: "2rem",
    padding: "2rem",
    textAlign: "center",
  },
  dangerInner: {
    background: "#fff",
    borderRadius: "8px",
    padding: "2rem",
  },
  dangerTitle: {
    color: "#fa6b6b",
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  dangerActions: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
  },
  deleteBtn: {
    background: "#fae0e0",
    color: "#a12222",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: 500,
    fontSize: "1rem",
    padding: "0.75rem 2rem",
    cursor: "pointer",
  },
};

// ========== PANELS DO TOPO ==========
function NewFAQPanel({ setSwapped }) {
  return (
    <div style={styles.card}>
      <div style={styles.badge}>New</div>
      <div style={styles.qa}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>
          Question will be here
        </div>
        <div>Answer will be here this is the stuff that needs to go in</div>
      </div>
      <div style={styles.actionCol}>
        <button style={styles.confirm} onClick={() => setSwapped(true)}>
          Confirm Add
        </button>
        <button style={styles.reject}>Reject</button>
      </div>
    </div>
  );
}
NewFAQPanel.propTypes = {
  setSwapped: PropTypes.func.isRequired,
};

function WarningPanel({ setSwapped }) {
  return (
    <div style={styles.warningBox}>
      <div style={styles.warningInner}>
        <div style={styles.warningTitle}>
          This New FAQ Will directly write into the brain.
        </div>
        <div style={styles.warningText}>
          Please check similarities of other FAQs below
        </div>
        <div style={styles.warningActions}>
          <button onClick={() => setSwapped(false)} style={styles.cancel}>
            Cancel
          </button>
          <button style={styles.confirm}>Confirm Add</button>
        </div>
      </div>
    </div>
  );
}
WarningPanel.propTypes = {
  setSwapped: PropTypes.func.isRequired,
};

function DeleteWarningPanel({ onCancel, onConfirm }) {
  return (
    <div style={styles.dangerBox}>
      <div style={styles.dangerInner}>
        <div style={styles.dangerTitle}>Warning!</div>
        <div style={{ color: "#666", marginBottom: "2rem" }}>
          This action will directly affect the existing brain knowledge
        </div>
        <div style={styles.dangerActions}>
          <button style={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
          <button style={styles.deleteBtn} onClick={onConfirm}>
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
DeleteWarningPanel.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

function FaqCard({ faq, onDelete }) {
  return (
    <div style={styles.card}>
      <div>[]]</div>
      <div style={styles.qa}>
        <div style={{ fontWeight: 600 }}>{faq.question}</div>
        <div>{faq.answer}</div>
      </div>
      <button style={styles.deleteBtn} onClick={() => onDelete(faq.id)}>
        Delete
      </button>
    </div>
  );
}
FaqCard.propTypes = {
  faq: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function FAQSwapDemo() {
  const [swapped, setSwapped] = useState(false);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Question 1 will be here",
      answer: "Answer will be here this is the stuff that needs to go in",
    },
    {
      id: 2,
      question: "Another question here",
      answer: "Another answer for testing.",
    },
    {
      id: 3,
      question: "One more?",
      answer: "Yes, why not.",
    },
  ]);

  const [deletingId, setDeletingId] = useState(null);

  const handleConfirmDelete = (id) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
    setDeletingId(null);
  };

  const handleCancel = () => setDeletingId(null);

  return (
    <div style={styles.container}>
      <h2 style={{ fontWeight: 700, marginBottom: "2rem" }}>
        You have similar FAQs in the brain
      </h2>
      <button style={styles.swapBtn} onClick={() => setSwapped((v) => !v)}>
        🔁 Swap Panels
      </button>
      {swapped ? (
        <WarningPanel setSwapped={setSwapped} />
      ) : (
        <NewFAQPanel setSwapped={setSwapped} />
      )}

      <hr style={{ margin: "2rem 0" }} />

      <div
        style={{
          maxHeight: "350px",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {faqs.map((faq) =>
          deletingId === faq.id ? (
            <DeleteWarningPanel
              key={faq.id}
              onCancel={handleCancel}
              onConfirm={() => handleConfirmDelete(faq.id)}
            />
          ) : (
            <FaqCard key={faq.id} faq={faq} onDelete={setDeletingId} />
          )
        )}
      </div>
    </div>
  );
}
