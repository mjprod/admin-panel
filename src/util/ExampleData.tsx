export interface Message {
  id: number;
  language: string;
  languageLabel: string;
  subcategories: string[];
  userQuestion: string;
  aiAnswer: string;
}

export interface Conversation {
  id: number;
  conversationId: string;
  category: string;
  progress: string;
  title: string;
  date: string;
  time: string;
  lang: string;
  messages: Message[];
}

export const conversations = [
  {
    id: 1,
    conversationId: "12345789489s89asda",
    category: "Technical",
    progress: "0/10",
    title: "Conversation 01",
    date: "15/2/2025",
    time: "12:24:01 pm",
    lang: "EN",
    messages: [
      {
        id: 1,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 2,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account"],
        userQuestion: "Hi",
        aiAnswer: "Sure",
      },
    ],
  },
  {
    id: 2,
    conversationId: "22222222222222",
    category: "Account",
    progress: "2/5",
    title: "Conversation 02",
    date: "14/2/2025",
    time: "10:30:00 am",
    lang: "MY",
    messages: [
      {
        id: 1,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 2,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 3,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
    ],
  },

  {
    id: 3,
    conversationId: "33333333333",
    category: "Account",
    progress: "2/5",
    title: "Conversation 03",
    date: "14/2/2025",
    time: "10:30:00 am",
    lang: "MY",
    messages: [
      {
        id: 1,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 2,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 3,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
    ],
  },

  {
    id: 4,
    conversationId: "444444444444",
    category: "Account",
    progress: "2/5",
    title: "Conversation 04",
    date: "14/2/2025",
    time: "10:30:00 am",
    lang: "MY",
    messages: [
      {
        id: 1,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 2,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 3,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
    ],
  },

  {
    id: 5,
    conversationId: "55555555555",
    category: "Account",
    progress: "2/5",
    title: "Conversation 05",
    date: "14/2/2025",
    time: "10:30:00 am",
    lang: "MY",
    messages: [
      {
        id: 1,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 2,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
      {
        id: 3,
        language: "EN",
        languageLabel: "English",
        subcategories: ["Account", "Technical", "Others"],
        userQuestion: "Hi, I have a question about my account",
        aiAnswer:
          "Sure, I can help you with that. What is your account number?",
      },
    ],
  },
];
