import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  getQuestionStatusFromSideCardType,
  SideCardType,
} from "../util/QuestionStatus";
import {
  ContextItem,
  EditablePair,
  KnowledgeCard,
} from "../api/responsePayload/KnowledgeResponse";
import {
  AllConversation,
  GetBrain,
  GetBrainId,
  GetContext,
  KowledgeSummary,
  SearchBrain,
  getAllCategories,
  getSubCategories,
} from "../api/apiCalls";
import { Category, SubCategory } from "../util/ExampleData";
import { AuthContext } from "./AuthContext";
import { showConsoleError } from "../util/ConsoleMessage";
import { BrainItem } from "../api/responsePayload/BrainResponse";
import { useAppDispatch } from "../store/hooks";
import { resetPagination, setPagination } from "../store/pagination.slice";

// Define the context type
interface ConversationsContextType {
  conversations: KnowledgeCard[];
  setConversations: React.Dispatch<React.SetStateAction<KnowledgeCard[]>>;
  statusClicked: SideCardType;
  setStatusClicked: React.Dispatch<React.SetStateAction<SideCardType>>;
  setUpdateConversationList: React.Dispatch<React.SetStateAction<boolean>>;
  onPrevPageClicked: (prePageUrl: string | null) => void;
  onNextPageClicked: (nextPageUrl: string | null) => void;
  onPageChanged: (page: number | null) => void;
  categories: Category[];
  subCategories: SubCategory[];
  totalKnowledgeCount: number;
  context: ContextItem[];
  setContext: React.Dispatch<React.SetStateAction<ContextItem[]>>;
  setUpdateContextList: React.Dispatch<React.SetStateAction<boolean>>;
  addedPairs: { [key: number]: EditablePair[] };
  brainList: BrainItem[];
  searchBrain: (
    query: string,
    searchType: string,
    page: number | undefined
  ) => void;
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
  const [statusClicked, setStatusClicked] = useState<SideCardType>(
    SideCardType.NeedApproval
  );
  const [isUpdateConversationList, setUpdateConversationList] = useState(false);
  const [isUpdateContextList, setUpdateContextList] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [totalKnowledgeCount, setTotalKnowledgeCount] = useState(0);

  const [context, setContext] = useState<ContextItem[]>([]);
  const addedPairs: { [key: number]: EditablePair[] } = {};

  const [brainList, setBrainList] = useState<BrainItem[]>([]);

  const { isSignedIn } = useContext(AuthContext);

  const dispatch = useAppDispatch();

  const contextApiCall = async (
    endpoint: string | undefined = undefined,
    page: number | undefined = undefined
  ) => {
    try {
      if (!isSignedIn) return;
      const res = await GetContext(endpoint, page);
      if (res) {
        setContext(res.results);
        dispatch(
          setPagination({
            currentPage: res.current_page,
            nextPageUrl: res.next,
            prevPageUrl: res.previous,
            totalPages: res.total_pages,
            totalCount: res.count,
          })
        );
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const conversationApiCall = async (
    endpoint: string | undefined = undefined,
    page: number | undefined = undefined
  ) => {
    try {
      if (!isSignedIn) return;

      const currentStatus = getQuestionStatusFromSideCardType(statusClicked);

      const params = {
        ...(currentStatus !== null && { status: currentStatus }),
        ...(page !== null && { page: page }),
      };

      const res = await AllConversation(endpoint, {}, params);
      if (res) {
        setConversations(res.data);
        dispatch(
          setPagination({
            currentPage: res.current_page,
            nextPageUrl: res.next,
            prevPageUrl: res.previous,
            totalPages: res.total_pages,
            totalCount: res.count,
          })
        );
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const brainApiCall = async (
    endpoint: string | undefined = undefined,
    id: number | undefined = undefined,
    page: number | undefined = undefined
  ) => {
    try {
      if (!isSignedIn) return;
      const res = await GetBrain(endpoint, id, page);
      if (res) {
        setBrainList(res.results);
        dispatch(
          setPagination({
            currentPage: res.current_page,
            nextPageUrl: res.next,
            prevPageUrl: res.previous,
            totalPages: res.total_pages,
            totalCount: res.count,
          })
        );
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const searchBrainApiCall = async (
    endpoint: string | undefined = undefined,
    queryParams: Record<string, any> = {}
  ) => {
    try {
      if (!isSignedIn) return;

      const res = await SearchBrain(endpoint, queryParams);
      if (res) {
        setBrainList(res.results);
        dispatch(
          setPagination({
            currentPage: res.current_page,
            nextPageUrl: res.next,
            prevPageUrl: res.previous,
            totalPages: res.total_pages,
            totalCount: res.count,
          })
        );
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const searchBrain = (
    query: string,
    searchType: string,
    page: number | undefined = undefined
  ) => {
    if (!query) {
      brainApiCall(undefined, undefined, page);
      return;
    }
    if (searchType == "id") {
      GetBrainId(Number(query))
        .then((res) => {
          res && setBrainList([res]);
          dispatch(resetPagination());
        })
        .catch((error) => {
          console.error("Failed to get brain ID:", error);
        });
    } else {
      const queryParams = {
        ...(searchType == "query" && { query: query }),
      };
      searchBrainApiCall(undefined, queryParams);
    }
  };

  const updateConvList = () => {
    if (isUpdateConversationList) {
      conversationApiCall();
      getKnowledgeSummary();
      setUpdateConversationList(false);
    }
  };

  const updateContextList = () => {
    if (isUpdateContextList) {
      contextApiCall();
      setUpdateContextList(false);
    }
  };

  const getKnowledgeSummary = async () => {
    try {
      const res = await KowledgeSummary();
      if (res && res.categories) {
        const totalKnowledgeCount = res.categories.reduce(
          (sum, category) => sum + category.knowledge_count,
          0
        );
        setTotalKnowledgeCount(totalKnowledgeCount);
      }
    } catch (e) {
      showConsoleError(e);
    }
  };

  useEffect(() => {
    updateConvList();
  }, [isUpdateConversationList]);

  useEffect(() => {
    updateContextList();
  }, [isUpdateContextList]);

  const onPageChanged = (page: number | null) => {
    if (!!page) {
      if (statusClicked === SideCardType.Context) {
        contextApiCall(undefined, page);
      } else if (statusClicked === SideCardType.Brain) {
        brainApiCall(undefined, undefined, page);
      } else {
        conversationApiCall(undefined, page);
      }
    }
  };

  const onPrevPageClicked = (prePageUrl: string | null) => {
    if (!!prePageUrl) {
      if (statusClicked === SideCardType.Context) {
        contextApiCall(prePageUrl);
      } else if (statusClicked === SideCardType.Brain) {
        brainApiCall(prePageUrl);
      } else {
        conversationApiCall(prePageUrl);
      }
    }
  };

  const onNextPageClicked = (nextPageUrl: string | null) => {
    if (!!nextPageUrl) {
      if (statusClicked === SideCardType.Context) {
        contextApiCall(nextPageUrl);
      } else if (statusClicked === SideCardType.Brain) {
        brainApiCall(nextPageUrl);
      } else {
        conversationApiCall(nextPageUrl);
      }
    }
  };

  const getCategories = async () => {
    const res = await getAllCategories();

    if (res != null) {
      setCategories(res);
    }
    const resSub = await getSubCategories();

    if (resSub != null) {
      setSubCategories(resSub);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getCategories();
      conversationApiCall();
    }
  }, [isSignedIn]);

  useEffect(() => {
    getKnowledgeSummary();
  }, [categories]);

  useEffect(() => {
    switch (statusClicked) {
      case SideCardType.NeedApproval:
      case SideCardType.Rejected:
        conversationApiCall();
        break;
      case SideCardType.Context:
        contextApiCall();
        break;
      case SideCardType.Brain:
        brainApiCall();
      default:
        break;
    }
  }, [statusClicked]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        setConversations,
        statusClicked,
        setStatusClicked,
        setUpdateConversationList,
        onPrevPageClicked,
        onNextPageClicked,
        onPageChanged,
        categories,
        subCategories,
        totalKnowledgeCount,
        context,
        setContext,
        setUpdateContextList,
        addedPairs,
        brainList,
        searchBrain,
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
