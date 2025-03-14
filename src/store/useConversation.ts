import { useEffect, useState } from "react";
import { KnowledgeCard } from "../api/responsePayload/KnowledgeResponse";
import { AllConversation } from "../api/auth";
import { QuestionStatus } from "../util/QuestionStatus";
import { CategoryProps } from "../pages/newManager/components/QuestionTools";
import {  DEFAULT_LANGUAGE_ID } from "../api/contants";

export const useConversations = () => {
  const [conversations, setConversations] = useState<KnowledgeCard[]>([]);
  const [statusClicked, setStatusClicked] = useState<QuestionStatus>(
    QuestionStatus.NeedApproval
  );
  const [selectedCategories, setSelectedCategories] = useState<CategoryProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prePageUrl, setPrePageUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const conversationApiCall = async (endpoint: string | undefined = undefined, queryParams: Record<string, any> = {}) => {
    const updatedQuery =  { ...queryParams,  ...{"language": DEFAULT_LANGUAGE_ID} }
    const res = await AllConversation(endpoint, {}, updatedQuery);
    if (res) {
    //   const data = res.data.filter((item) => {
    //     return item.status == queryParams["status"];
    //   });
      console.log("map data .....", res.data)
     
      setConversations(res.data);
      setCurrentPage(res.current_page);
      setNextPageUrl(res.next);
      setPrePageUrl(res.previous)
      setTotalPages(res.total_pages)
      setTotalCount(res.count)
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

  const onPrevPageClicked = () => {
    if (!!prePageUrl) {
        conversationApiCall(prePageUrl, {});
    }
  }

  const onNextPageClicked = () => {
    console.log("on Next page Clicked", nextPageUrl)
    if (!!nextPageUrl) {
        conversationApiCall(nextPageUrl, {});
    }
  }

  useEffect(() => {
    fetchConversations(QuestionStatus.NeedApproval);
  }, []);

  useEffect(() => {
    fetchConversations(statusClicked);

    console.log('statusClicked------', statusClicked)
  }, [statusClicked]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      if (
        selectedCategories.length == 1 &&
        selectedCategories.some((category) => category.id === 0)
      ) {
        conversationApiCall()
      } else {
        conversationApiCall(undefined, {category: selectedCategories[0].id})
      }
    }
  }, [selectedCategories, statusClicked]);

  return {
    conversations,
    setConversations,
    statusClicked,
    setStatusClicked,
    selectedCategories,
    setSelectedCategories,
    filterByCategory,
    currentPage,
    onPrevPageClicked,
    onNextPageClicked,
    totalPages,
    totalCount
  };
};
