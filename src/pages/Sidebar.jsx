import React, { useState } from "react";
import FilterSelect from "./FilterSelect";
import LanguageSelector from "./LanguageSelector";
import ConversationList from "../components/ConversationList";

const Sidebar = () => {
  const conversations = [
    {
      id: 1,
      category: "Technical",
      progress: "0/10",
      title: "Conversation 01",
      date: "15/2/2025",
      time: "12:24:01 pm",
      lang: "EN",
    },
    {
      id: 2,
      category: "Account",
      progress: "2/5",
      title: "Conversation 02",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },

    {
      id: 3,
      category: "Account",
      progress: "2/5",
      title: "Conversation 03",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },

    {
      id: 4,
      category: "Account",
      progress: "2/5",
      title: "Conversation 04",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },

    {
      id: 5,
      category: "Account",
      progress: "2/5",
      title: "Conversation 05",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },

    {
      id: 6,
      category: "Account",
      progress: "2/5",
      title: "Conversation 06",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },

    {
      id: 7,
      category: "Account",
      progress: "2/5",
      title: "Conversation 07",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },

    {
      id: 8,
      category: "Account",
      progress: "2/5",
      title: "Conversation 08",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },

    {
      id: 9,
      category: "Account",
      progress: "2/5",
      title: "Conversation 09",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },
    {
      id: 10,
      category: "Account",
      progress: "2/5",
      title: "Conversation 10",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },
    {
      id: 11,
      category: "Account",
      progress: "2/5",
      title: "Conversation 11",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },
    {
      id: 12,
      category: "Account",
      progress: "2/5",
      title: "Conversation 12",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },
    {
      id: 13,
      category: "Account",
      progress: "2/5",
      title: "Conversation 13",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },
    {
      id: 14,
      category: "Account",
      progress: "2/5",
      title: "Conversation 14",
      date: "14/2/2025",
      time: "10:30:00 am",
      lang: "MY",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(conversations.length / itemsPerPage);

  const currentItems = conversations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <aside className="sidebar">
      <div className="tools-container">
        <h2 className="tools-heading">Conversation List</h2>
        <div className="row02">
          <FilterSelect />
          <LanguageSelector />
        </div>
      </div>
      <ConversationList
        conversations={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </aside>
  );
};

export default Sidebar;
