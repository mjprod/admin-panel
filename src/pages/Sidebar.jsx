import React from "react";
import FilterSelect from "./FilterSelect";
import LanguageSelector from "./LanguageSelector";
import ConversationList from "./ConversationList";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="tools-container">
        <h2 className="tools-heading">Conversation List</h2>
        <div className="row02">
          <FilterSelect />
          <LanguageSelector />
        </div>
      </div>
      <ConversationList />
    </aside>
  );
};

export default Sidebar;