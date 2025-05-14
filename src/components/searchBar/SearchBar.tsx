import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useConversationsContext } from "../../context/ConversationProvider";

interface SearchBarProps {
}

const SearchBar: React.FC<SearchBarProps> = ({ }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"query" | "id">("query");

  const {searchBrain} = useConversationsContext();

  const handleSend = () => {
    if (query.trim()) {
        searchBrain(query, searchType)
    }
  };

  const handleClear = () => {
    setQuery("")
    searchBrain("", searchType)
  }

  return (
    <div className={styles["search-bar"]}>
      <select
        className={styles["search-select"]}
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as "query" | "id")}
      >
        <option value="query">Query</option>
        <option value="id">ID</option>
      </select>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder={searchType === "id" ? "Enter ID..." : "Search text..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className={styles["send-button"]} onClick={handleSend}>
        Send
      </button>
      <button className={styles["clear-button"]} onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
