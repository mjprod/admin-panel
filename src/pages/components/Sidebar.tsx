import React, { useState } from "react";
// import FilterSelect from "./FilterSelect";
// import LanguageSelector from "./LanguageSelector";
import ConversationList from "../../components/ConversationList";
import { Conversation } from "../../util/ExampleData";

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
    <aside className="sidebar">
      {/* <div className="tools-container">
        <h2 className="tools-heading">Conversation List</h2>
        <div className="row02">
          <FilterSelect />
          <LanguageSelector />
        </div>
      </div> */}
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
