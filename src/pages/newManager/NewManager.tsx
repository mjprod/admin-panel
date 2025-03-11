import TopBar from "./components/topBar/TopBar";
import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/bottomBar/BottomBar";
import QuestionCard from "./components/QuestionCard";
import {
  approvedConvs,
  needApprovalConvs,
  rejectedConvs,
} from "../../util/ExampleData";
import { useEffect, useState } from "react";
import { QuestionStatus } from "../../util/QuestionStatus";
import clsx from "clsx";
import { TagColor } from "../../components/tags/Tag";
import { CategoryProps } from "./components/QuestionTools";
import { useTranslation } from "react-i18next";

const NewManager = () => {
  const [statusClicked, setStatusClicked] = useState(
    QuestionStatus.NeedApproval
  );
  const [conversations, setConversations] = useState(needApprovalConvs);
  const [selectedCategories, setSelectedCategories] = useState<CategoryProps[]>(
    []
  );

  const {t} = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(conversations.length / itemsPerPage);

  const currentItems = conversations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories: CategoryProps[] = [
    {
      id: 0,
      title: t("category.all"),
      number: 24000,
      color: TagColor.ALL,
      isSelected: true,
    },
    {
      id: 3,
      title: t("category.fourDLotto"),
      number: 1356,
      color: TagColor.GOLDISH,
      isSelected: false,
    },
    {
      id: 2,
      title: t("category.technology"),
      number: 1356,
      color: TagColor.PINK,
      isSelected: false,
    },
    {
      id: 1,
      title: t("category.account"),
      number: 136,
      color: TagColor.PURPLE,
      isSelected: false,
    },
    {
      id: 5,
      title: t("category.finance"),
      number: 396,
      color: TagColor.GREEN,
      isSelected: false,
    },

    {
      id: 6,
      title: t("category.lucky7"),
      number: 972,
      color: TagColor.NAVY_BLUE,
      isSelected: false,
    },
  ];

  useEffect(() => {
    switch (statusClicked) {
      case QuestionStatus.NeedApproval:
        setConversations(needApprovalConvs);
        break;
      case QuestionStatus.PreApproved:
        setConversations(approvedConvs);

        break;
      case QuestionStatus.Rejected:
        setConversations(rejectedConvs);
        break;
    }
  }, [statusClicked]);

  useEffect(() => {
    let filteredConversations = [];
    switch (statusClicked) {
      case QuestionStatus.NeedApproval:
        filteredConversations = needApprovalConvs;
        break;
      case QuestionStatus.PreApproved:
        filteredConversations = approvedConvs;
        break;
      case QuestionStatus.Rejected:
        filteredConversations = rejectedConvs;
        break;
    }

    if (selectedCategories.length > 0) {
      if (
        selectedCategories.length == 1 &&
        selectedCategories.some((category) => category.id === 0)
      ) {
        filteredConversations = filteredConversations;
      } else {
        filteredConversations = filteredConversations.filter((conversation) =>
          selectedCategories.some(
            (category) => conversation.category.id === category.id
          )
        );
      }
    }

    setConversations(filteredConversations);
  }, [selectedCategories, statusClicked]);

  const handleCategoryClick = (category: CategoryProps) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.some((cat) => cat.id === category.id)) {
        return prevCategories.filter((cat) => cat.id !== category.id);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  return (
    <div className={styles["main-container"]}>
      <Sidebar
        onSideCardClicked={setStatusClicked}
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
      <main
        className={clsx(
          statusClicked !== QuestionStatus.NeedApproval
            ? styles["main-content"]
            : ""
        )}
      >
        <TopBar topBarType={statusClicked} total={conversations.length} />
        <div className={styles["question-group-scroll-container"]}>
          {currentItems.map((con, index) => (
            <QuestionCard key={index + con.conversationId} {...con} />
          ))}
        </div>
        <BottomBar
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default NewManager;
