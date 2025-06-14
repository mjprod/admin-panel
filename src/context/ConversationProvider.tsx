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
  CategorySummary,
  ContextItem,
  EditablePair,
  KnowledgeCard,
  LanguageCode,
} from "../api/responsePayload/KnowledgeResponse";
import { CategoryProps } from "../pages/newManager/components/sideBar/questionTools/QuestionTools";
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
import { useTranslation } from "react-i18next";
import { showConsoleError } from "../util/ConsoleMessage";
import { BrainItem } from "../api/responsePayload/BrainResponse";
import { defaultLanguage } from "../api/contants";

// Define the context type
interface ConversationsContextType {
  conversations: KnowledgeCard[];
  setConversations: React.Dispatch<React.SetStateAction<KnowledgeCard[]>>;
  statusClicked: SideCardType;
  setStatusClicked: React.Dispatch<React.SetStateAction<SideCardType>>;
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
  categories: Category[];
  subCategories: SubCategory[];
  totalKnowledgeCount: number;
  categoriesFilter: CategoryProps[];
  language: LanguageCode;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageCode>>;
  context: ContextItem[];
  setContext: React.Dispatch<React.SetStateAction<ContextItem[]>>;
  setUpdateContextList: React.Dispatch<React.SetStateAction<boolean>>;
  addedPairs: { [key: number]: EditablePair[] };
  brainList: BrainItem[];
  searchBrain: (query: string, searchType: string, page: number | undefined) => void;
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
  const { i18n } = useTranslation();
  const [conversations, setConversations] = useState<KnowledgeCard[]>([]);
  const [statusClicked, setStatusClicked] = useState<SideCardType>(
    SideCardType.NeedApproval
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
  const [isUpdateContextList, setUpdateContextList] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [totalKnowledgeCount, setTotalKnowledgeCount] = useState(0);
  const [categoriesFilter, setCategoriesFilter] = useState<CategoryProps[]>([]);
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  const [context, setContext] = useState<ContextItem[]>([]);
  const addedPairs: { [key: number]: EditablePair[] } = {};

  const [brainList, setBrainList] = useState<BrainItem[]>([]);

  const { isSignedIn } = useContext(AuthContext);

  const contextApiCall = async (endpoint: string | undefined = undefined) => {
    try {
      if (!isSignedIn) return;
      const res = await GetContext(endpoint);
      if (res) {
        setContext(res.results);
        setCurrentPage(res.current_page);
        setNextPageUrl(res.next);
        setPrePageUrl(res.previous);
        setTotalPages(res.total_pages);
        setTotalCount(res.count);
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const conversationApiCall = async (
    endpoint: string | undefined = undefined,
    queryParams: Record<string, any> = {}
  ) => {
    try {
      if (!isSignedIn) return;

      const updatedQuery = {
        ...queryParams,
        ...{ language: language.id },
      };
      const res = await AllConversation(
        language.code,
        endpoint,
        {},
        updatedQuery
      );
      if (res) {
        setConversations(res.data);
        setCurrentPage(res.current_page);
        setNextPageUrl(res.next);
        setPrePageUrl(res.previous);
        setTotalPages(res.total_pages);
        setTotalCount(res.count);
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const brainApiCall = async (
    endpoint: string | undefined = undefined,
    id: number | undefined = undefined,
    page: number | undefined = undefined,
  ) => {
    try {
      if (!isSignedIn) return;
      const res = await GetBrain(endpoint, id, page);
      if (res) {
        setBrainList(res.results);
        setCurrentPage(res.current_page);
        setNextPageUrl(res.next);
        setPrePageUrl(res.previous);
        setTotalPages(res.total_pages);
        setTotalCount(res.count);
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
        setCurrentPage(res.current_page);
        setNextPageUrl(res.next);
        setPrePageUrl(res.previous);
        setTotalPages(res.total_pages);
        setTotalCount(res.count);
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const searchBrain = (query: string, searchType: string, page: number | undefined = undefined) => {
    if (!query) {
      brainApiCall(undefined, undefined, page);
      return;
    }
    if (searchType == "id") {
      GetBrainId(Number(query))
        .then((res) => {
          res && setBrainList([res]);
          setCurrentPage(1);
          setNextPageUrl(null);
          setPrePageUrl(null);
          setTotalPages(1);
          setTotalCount(res ? 1 : 0);
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

  const filterByCategory = (category: CategoryProps) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((prev) => prev.id !== category.id)
        : [...prev, category]
    );
  };

  const fetchConversations = async () => {
    const currentStatus = getQuestionStatusFromSideCardType(statusClicked);
    const categoryIds = getCategoryIds(selectedCategories);

    const params = {
      ...(currentStatus !== null && { status: currentStatus }),
      ...(categoryIds.length > 0 && { category: categoryIds }),
    };

    conversationApiCall(undefined, params);
  };

  const getCategoryIds = (categories?: { id: number }[]): string => {
    return categories && categories.length > 0
      ? categories.map((category) => category.id).join(",")
      : "";
  };

  const updateConvList = () => {
    if (isUpdateConversationList) {
      fetchConversations();
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
      const res = await KowledgeSummary(language.id);
      if (res && res.categories) {
        const totalKnowledgeCount = res.categories.reduce(
          (sum, category) => sum + category.knowledge_count,
          0
        );
        setTotalKnowledgeCount(totalKnowledgeCount);
        setCategoriesFilter(mapToCategoryProps(res.categories));
      }
    } catch (e) {
      showConsoleError(e);
    }
  };

  const mapToCategoryProps = (cats: CategorySummary[]): CategoryProps[] => {
    const filteredCategories = cats.filter(
      (category) => category.knowledge_count > 0
    );
    return filteredCategories.map((cat) => {
      return {
        id: cat.id,
        title: cat.name,
        number: cat.knowledge_count,
        color: categories.find((data) => cat.id == data.id)?.colorDetails || {
          borderColor: "#fff",
          lightColor: "#fff",
          darkColor: "#000",
        },
      };
    });
  };

  useEffect(() => {
    updateConvList();
  }, [isUpdateConversationList]);

  useEffect(() => {
    updateContextList();
  }, [isUpdateContextList]);

  useEffect(() => {
    i18n.changeLanguage(language.code);
    fetchConversations();
  }, [language]);

  const onPrevPageClicked = () => {
    if (!!prePageUrl) {
      if (statusClicked === SideCardType.Context) {
        contextApiCall(prePageUrl);
      } else if (statusClicked === SideCardType.Brain) {
        brainApiCall(prePageUrl);
      } else {
        conversationApiCall(prePageUrl, {});
      }
    }
  };

  const onNextPageClicked = () => {
    if (!!nextPageUrl) {
      if (statusClicked === SideCardType.Context) {
        contextApiCall(nextPageUrl);
      } else if (statusClicked === SideCardType.Brain) {
        brainApiCall(nextPageUrl);
      } else {
        conversationApiCall(nextPageUrl, {});
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
      fetchConversations();
    }
  }, [isSignedIn]);

  useEffect(() => {
    getKnowledgeSummary();
  }, [categories]);

  useEffect(() => {
    switch (statusClicked) {
      case SideCardType.NeedApproval:
      case SideCardType.Rejected:
        fetchConversations();
        break;
      case SideCardType.Context:
        contextApiCall();
        break;
      case SideCardType.Brain:
        brainApiCall();
      default:
        break;
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
        categories,
        subCategories,
        totalKnowledgeCount,
        categoriesFilter,
        language,
        setLanguage,
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
