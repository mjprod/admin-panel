import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getStatusNumber, QuestionStatus } from "../util/QuestionStatus";
import {
  CategorySummary,
  KnowledgeCard,
  Language,
  LanguageCode
} from "../api/responsePayload/KnowledgeResponse";
import { CategoryProps } from "../pages/newManager/components/sideBar/questionTools/QuestionTools";
import {
  AllConversation,
  KowledgeSummary,
  getAllCategories,
  getSubCategories,
} from "../api/auth";
import { Category, SubCategory } from "../util/ExampleData";
import { AuthContext } from "./AuthContext";
import { useTranslation } from "react-i18next";
import { showConsoleError } from "../util/ConsoleMessage";

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
  categories: Category[];
  subCategories: SubCategory[];
  totalKnowledgeCount: number;
  categoriesFilter: CategoryProps[];
  language: LanguageCode;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageCode>>;
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
  const {i18n} = useTranslation()
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [totalKnowledgeCount, setTotalKnowledgeCount] = useState(0);
  const [categoriesFilter, setCategoriesFilter] = useState<CategoryProps[]>([]);
  const [language, setLanguage] = useState<LanguageCode>(Language.MALAYSIAN)

  const { isSignedIn } = useContext(AuthContext);

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
      const res = await AllConversation(language.code, endpoint, {}, updatedQuery);
      if (res) {
        setConversations(res.data);
        setCurrentPage(res.current_page);
        setNextPageUrl(res.next);
        setPrePageUrl(res.previous);
        setTotalPages(res.total_pages);
        setTotalCount(res.count);
      } else {
        showConsoleError("API Response:Error", res);
      }
    } catch (e) {
      showConsoleError("API Response:Error", e);
    }
  };

  const filterByCategory = (category: CategoryProps) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((prev) => prev.id !== category.id)
        : [...prev, category]
    );
  };

  const fetchConversations = async (status: QuestionStatus) => {
    conversationApiCall(undefined, { status: getStatusNumber(status) });
  };

  const getCategoryIds = (categories?: { id: number }[]): string => {
    return categories && categories.length > 0
      ? categories.map((category) => category.id).join(",")
      : "";
  };

  const refreshConversations = async () => {
    conversationApiCall(undefined, {
      status: getStatusNumber(statusClicked),
      ...{ category: getCategoryIds(selectedCategories) },
    });
  };

  const updateConvList = () => {
    if (isUpdateConversationList) {
      refreshConversations();
      getKnowledgeSummary();
      setUpdateConversationList(false);
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
    i18n.changeLanguage(language.code);
    refreshConversations()
  }, [language]);

  const onPrevPageClicked = () => {
    if (!!prePageUrl) {
      conversationApiCall(prePageUrl, {});
    }
  };

  const onNextPageClicked = () => {
    if (!!nextPageUrl) {
      conversationApiCall(nextPageUrl, {});
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
      fetchConversations(QuestionStatus.NeedApproval);
      getCategories();
    }
  }, [isSignedIn]);

  useEffect(() => {
    getKnowledgeSummary();
  }, [categories]);

  useEffect(() => {
    fetchConversations(statusClicked);
  }, [statusClicked]);

  useEffect(() => {
    refreshConversations();
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
        setLanguage
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
