import TopBar from "./components/topBar/TopBar";
import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/bottomBar/BottomBar";
import { useEffect, useState } from "react";
import { QuestionStatus } from "../../util/QuestionStatus";
import clsx from "clsx";
import { TagColor } from "../../components/tags/Tag";
import { CategoryProps } from "./components/QuestionTools";
import { useTranslation } from "react-i18next";
import SelectAllBar from "./components/topBar/SelectAllBar";
import QuestionList from "./components/QuestionList";
import { useConversations } from "../../store/useConversation";

const NewManager = () => {
  const {
    conversations,
    setConversations,
    statusClicked,
    setStatusClicked,
    filterByCategory,
    totalCount,
    currentPage,
    onPrevPageClicked,
    onNextPageClicked,
    totalPages,
  } = useConversations();

  const [checked, setChecked] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);

  useEffect(() => {
    conversations.some((conv) => conv.isSelected)
      ? setShowActionButton(true)
      : setShowActionButton(false);
    conversations.some((conv) => !conv.isSelected)
      ? setChecked(false)
      : setChecked(true);
  }, [conversations]);

  const { t } = useTranslation();

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

  const handleConversationSelected = (
    conversationId: string,
    checked: boolean
  ) => {
    const convo = conversations.find(
      (conv) => conv.conversationId === conversationId
    );
    if (convo) {
      convo.isSelected = checked;
      setConversations([...conversations]);
    }
  };

  const handleBulkAction = () => {
    setConversations((conversations) =>
      conversations.map((con) => {
        con.isSelected = false;
        return con;
      })
    );
  };

  const handleSelectAll = () => {
    setConversations((conversations) =>
      conversations.map((con) => {
        con.isSelected = !checked;
        return con;
      })
    );
  };

  return (
    <div className={styles["main-container"]}>
      <Sidebar
        card={statusClicked}
        onSideCardClicked={setStatusClicked}
        categories={categories}
        onCategoryClick={filterByCategory}
      />
      <main
        className={clsx(
          statusClicked !== QuestionStatus.NeedApproval
            ? styles["main-content"]
            : ""
        )}
      >
        <TopBar statusClicked={statusClicked} totalCount={totalCount} />
        <SelectAllBar
          questionStatus={statusClicked}
          showActionButton={showActionButton}
          checked={checked}
          onSelectAllClick={handleSelectAll}
          onBulkActionCommit={handleBulkAction}
        />
        <QuestionList
          conversations={conversations}
          onSelected={handleConversationSelected}
        />
        <BottomBar
          currentPage={currentPage}
          onPrevPageClicked={onPrevPageClicked}
          onNextPageClicked={onNextPageClicked}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
};

export default NewManager;
