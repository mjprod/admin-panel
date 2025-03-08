import TopBar, { TopBarType } from "./components/topBar/TopBar";
import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/bottomBar/BottomBar";
import QuestionCard, {
  QuestionCardProps,
  QuestionCardStatus,
} from "./components/QuestionCard";
import { LanguageProps } from "../../components/language/Language";

const NewManager = () => {
  const languages: LanguageProps[] = [
    {
      lang: "MY",
      isSolid: true,
    },
    {
      lang: "CN",
    },
    {
      lang: "EN",
      isCompleted: true,
    },
  ];
  const convs: QuestionCardProps[] = [
    {
      date: "15/2/2025",
      time: "12:24:01 pm",
      conversationId: "12345789489s89asda",
      category: "Account",
      languages: languages,
      currentlang: {
        lang: "MY",
        langLabel: "Malay",
        isSolid: true,
      },
      subcategories: ["Subcategory 01", "Subcategory 02"],
      question: "Mengapa deposit saya tidak ditunjukkan?",
      answer: "Sila semak penyata bank anda",
      status: QuestionCardStatus.NeedApproval,
    },
    {
      date: "15/2/2025",
      time: "12:24:01 pm",
      conversationId: "12345789489s89asda",
      category: "Technology",
      languages: languages,
      currentlang: {
        lang: "MY",
        langLabel: "Malay",
        isSolid: true,
      },
      subcategories: ["Subcategory 01", "Subcategory 02"],
      question: "Mengapa deposit saya tidak ditunjukkan?",
      answer: "Sila semak penyata bank anda",
      status: QuestionCardStatus.NeedApproval,
    },
    {
      date: "15/2/2025",
      time: "12:24:01 pm",
      conversationId: "12345789489s89asda",
      category: "4D",
      languages: languages,
      currentlang: {
        lang: "MY",
        langLabel: "Malay",
        isSolid: true,
      },
      subcategories: ["Subcategory 01", "Subcategory 02"],
      question: "Mengapa deposit saya tidak ditunjukkan?",
      answer: "Sila semak penyata bank anda",
      status: QuestionCardStatus.NeedApproval,
    },
  ];
  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <main>
        <TopBar topBarType={TopBarType.PreApproved} total={300} />
        <div className={styles["question-group-scroll-container"]}>
          {convs.map((con) => (
            <QuestionCard {...con} />
          ))}
        </div>
        <BottomBar totalPages={10} currentPage={1} />
      </main>
    </div>
  );
};

export default NewManager;
