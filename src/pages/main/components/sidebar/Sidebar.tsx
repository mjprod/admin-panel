import React, { useState } from "react";
import FilterSelect from "./FilterSelect";
import ConversationList from "./ConversationList";
import { Conversation } from "../../../../util/ExampleData";
import styles from "./Sidebar.module.css";
import LanguageList from "../../../../components/language/LanguageList";

interface SidebarProps {
  conversations: Conversation[];
  onConversationSelect: (conv: Conversation, index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({conversations, onConversationSelect}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(conversations.length / itemsPerPage);

  const currentItems = conversations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["tools-container"]}>
        <h2 className={styles["tools-heading"]}>Conversation List</h2>
        <div className={styles["row02"]}>
          <FilterSelect />
          <LanguageList languages={["MY", "CN", "TW", "EN"]} showTitle={true} />
        </div>
      </div>
      <ConversationList
        conversations={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onConversationSelect={onConversationSelect}
      />
    </aside>
  );
};

export default Sidebar;
