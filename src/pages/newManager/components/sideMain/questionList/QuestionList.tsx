import React, { useEffect } from "react";
import styles from "./QuestionList.module.css";
import QuestionCard from "./components/questionCard/QuestionCard";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { fetchConversations, setConversations } from "../../../../../store/slice/conversation.slice";

interface QuestionListProps {}

const QuestionList: React.FC<QuestionListProps> = ({ }) => {
    const dispatch = useAppDispatch();

    const selectedCategories = useAppSelector((state) => state.category.selectedCategories);
    const statusClicked = useAppSelector((state) => state.status.statusClicked);
    const {conversations} = useAppSelector((state) => state.conversation);
  
    useEffect(() => {
      dispatch(fetchConversations());
    }, [selectedCategories, statusClicked, dispatch]);

    const handleConversationSelected = (
      conversationId: string,
      checked: boolean
    ) => {
      const convo = conversations.find(
        (conv) => conv.conversationId === conversationId
      );
      if (convo) {
        convo.isSelected = checked;
        dispatch(setConversations([...conversations]))
      }
    };

  return (
    <div className={styles["question-group-scroll-container"]}>
      {conversations.map((con, index) => (
        <QuestionCard
          key={index + con.conversationId}
          {...con}
          onSelected={handleConversationSelected}
        />
      ))}
    </div>
  );
};

export default QuestionList;