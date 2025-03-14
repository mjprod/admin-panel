import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { QuestionStatus } from "../util/QuestionStatus";
import { KnowledgeCard } from "../api/responsePayload/KnowledgeResponse";
import { CategoryProps } from "../pages/newManager/components/QuestionTools";
import { AllConversation } from "../api/auth";
import { DEFAULT_LANGUAGE_ID } from "../api/contants";

// Define the context type
interface ConversationsContextType {
  conversations: KnowledgeCard[];
  setConversations: React.Dispatch<React.SetStateAction<KnowledgeCard[]>>;
  statusClicked: QuestionStatus;
  setStatusClicked: React.Dispatch<React.SetStateAction<QuestionStatus>>;
  selectedCategories: CategoryProps[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
  filterByCategory: (category: CategoryProps) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  totalPages: number;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  setUpdateConversationList: React.Dispatch<React.SetStateAction<boolean>>;
  onPrevPageClicked: () => void;
  onNextPageClicked: () => void;
}

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

// Create a provider component
export const ConversationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [conversations, setConversations] = useState<KnowledgeCard[]>([]);
  const [statusClicked, setStatusClicked] = useState<QuestionStatus>(
    QuestionStatus.NeedApproval
  );
  const [selectedCategories, setSelectedCategories] = useState<CategoryProps[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prePageUrl, setPrePageUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isUpdateConversationList, setUpdateConversationList] = useState(false);

  const conversationApiCall = async (
    endpoint: string | undefined = undefined,
    queryParams: Record<string, any> = {}
  ) => {
    const updatedQuery = {
      ...queryParams,
      ...{ language: DEFAULT_LANGUAGE_ID },
    };
    const res = await AllConversation(endpoint, {}, updatedQuery);
    if (res) {
      //   const data = res.data.filter((item) => {
      //     return item.status == queryParams["status"];
      //   });
      console.log("map data .....", res.data);

      setConversations(res.data);
      setCurrentPage(res.current_page);
      setNextPageUrl(res.next);
      setPrePageUrl(res.previous);
      setTotalPages(res.total_pages);
      setTotalCount(res.count);
    } else {
      console.log("API Response:Error", res);
    }
  };

  const fetchConversations = async (status: QuestionStatus) => {
    switch (status) {
      case QuestionStatus.NeedApproval:
        conversationApiCall(undefined, { status: 1 });
        break;
      case QuestionStatus.PreApproved:
        conversationApiCall(undefined, { status: 2 });
        break;
      case QuestionStatus.Rejected:
        conversationApiCall(undefined, { status: 4 });
        break;
    }
  };

  const filterByCategory = (category: CategoryProps) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((prev) => prev.id !== category.id)
        : [...prev, category]
    );
  };

  const updateConvList = () => {
    if (isUpdateConversationList) {
      console.log("isUpdateConversationList------", isUpdateConversationList);

      fetchConversations(statusClicked);
      setUpdateConversationList(false);
    }
  };

  useEffect(() => {
    console.log(
      "isUpdateConversationList------",
      statusClicked,
      isUpdateConversationList
    );

    updateConvList();
  }, [isUpdateConversationList]);

  const onPrevPageClicked = () => {
    if (!!prePageUrl) {
      conversationApiCall(prePageUrl, {});
    }
  };

  const onNextPageClicked = () => {
    console.log("on Next page Clicked", nextPageUrl);
    if (!!nextPageUrl) {
      conversationApiCall(nextPageUrl, {});
    }
  };

  useEffect(() => {
    fetchConversations(QuestionStatus.NeedApproval);
  }, []);

  useEffect(() => {
    fetchConversations(statusClicked);

    console.log("statusClicked------", statusClicked);
  }, [statusClicked]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      if (
        selectedCategories.length == 1 &&
        selectedCategories.some((category) => category.id === 0)
      ) {
        conversationApiCall();
      } else {
        conversationApiCall(undefined, { category: selectedCategories[0].id });
      }
    }
  }, [selectedCategories, statusClicked]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        setConversations,
        statusClicked,
        setStatusClicked,
        selectedCategories,
        setSelectedCategories,
        filterByCategory,
        currentPage,
        setCurrentPage,
        nextPageUrl,
        prevPageUrl: prePageUrl,
        totalPages,
        totalCount,
        setTotalCount,
        setUpdateConversationList,
        onPrevPageClicked,
        onNextPageClicked,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

// Custom hook to use the ConversationsContext
export const useConversationsContext = (): ConversationsContextType => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error(
      "useConversationsContext must be used within a ConversationsProvider"
    );
  }
  return context;
};
