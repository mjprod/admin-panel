import { LanguageProps } from "../../components/language/Language";
import {
  ChatDialogProps,
  MessageType,
  ChatType,
} from "../../components/popUp/popUpChatHistory/ChatDialog";
import { Category } from "../../util/ExampleData";
import {
  getLanguageByCode,
  getLanguageById,
  updateHslaValues,
  hexToHsla,
} from "../../util/ExtensionFunction";
import {
  KnowledgeResponse,
  ConversationKnowledge,
  KnowledgeCard,
  KnowledgeStatus,
  KnowledgeContext,
  ChatResponse,
} from "../responsePayload/KnowledgeResponse";

export const mapKnowledgeConversationData = (
  languageCode: string,
  response: KnowledgeResponse
): ConversationKnowledge => {
  const knowledgeinfo: KnowledgeCard[] = [];
  response.results.map((item) => {
    const knowledgeContent = item.knowledge_content.find(
      (con) => con.language == getLanguageByCode(languageCode).id
    );

    const langStatus: LanguageProps[] = item.knowledge_content.map((lang) => ({
      id: lang.language,
      lang: getLanguageById(lang.language),
      langLabel: getLanguageById(lang.language).label,
      isSolid: lang.language == getLanguageByCode(languageCode).id,
      isCompleted: lang.status == KnowledgeStatus.Approved,
      status: KnowledgeStatus[lang.status],
    }));

    if (knowledgeContent != null) {
      const status: KnowledgeStatus = (() => {
        switch (knowledgeContent.status) {
          case 1:
            return KnowledgeStatus.NeedReview;
          case 2:
            return KnowledgeStatus.PreApproved;
          case 3:
            return KnowledgeStatus.Approved;
          case 4:
            return KnowledgeStatus.Rejected;
          default:
            return KnowledgeStatus.Approved;
        }
      })();

      const lang: LanguageProps = {
        id: knowledgeContent.language,
        lang: getLanguageById(knowledgeContent.language),
        langLabel: getLanguageById(knowledgeContent.language).label,
        isSolid:
          knowledgeContent.language == getLanguageByCode(languageCode).id,
        isCompleted: knowledgeContent.status == KnowledgeStatus.Approved,
        status: KnowledgeStatus[knowledgeContent.status],
      };

      const categories: Category | null = item.category
        ? {
            id: item.category.id,
            name: item.category.name,
            color: item.category.color,
            description: item.category.description,
            colorDetails: {
              borderColor: updateHslaValues(
                hexToHsla(item.category.color),
                25,
                90
              ),
              lightColor: hexToHsla(item.category.color),
              darkColor: updateHslaValues(
                hexToHsla(item.category.color),
                86,
                30
              ),
            },
          }
        : null;

      const context = mapToKnowledgeContext(
        item.context?.context,
        knowledgeContent.question,
        knowledgeContent.answer
      );

      knowledgeinfo.push({
        knowledgeId: item.id,
        conversationId: item.knowledge_uuid,
        category: categories ? categories : null,
        subcategories: item.subcategory ? item.subcategory : null,
        id: knowledgeContent.id,
        dateTime: knowledgeContent.last_updated,
        languages: langStatus,
        currentlang: lang,
        question: knowledgeContent.question,
        answer: knowledgeContent.answer,
        isEdited: knowledgeContent.is_edited,
        inBrain: knowledgeContent.in_brain,
        status: status,
        context: context,
      });
    }
  });

  return {
    count: response.count,
    total_pages: response.total_pages,
    current_page: response.current_page,
    next: response.next,
    previous: response.previous,
    data: knowledgeinfo,
  };
};

export const mapToKnowledgeContext = (
  context: string | undefined,
  question: string | null,
  answer: string | null
): KnowledgeContext | null => {
  const contextJsonArray = mapToChatResponse(context);

  const chatData: ChatDialogProps[] = mapToChatDialogProps(
    contextJsonArray,
    question,
    answer
  );

  return contextJsonArray.length > 0
    ? {
        conversationId:
          contextJsonArray.length > 0 ? contextJsonArray[0].ConversationId : "",
        date_time:
          contextJsonArray.length > 0 ? contextJsonArray[0].CreateDate : "",
        chat_data: chatData,
      }
    : null;
};

export const mapToChatResponse = (
  chatString: string | undefined
): ChatResponse[] => {
  const cleanedStr = (chatString ?? "")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false");

  try {
    return !cleanedStr || cleanedStr.trim() === "" || cleanedStr === "[]"
      ? []
      : JSON.parse(cleanedStr);
  } catch (error) {
    console.error(
      "JSON parse error:",
      error,
      "\n\nCleaned string\n\n",
      cleanedStr,
      "\n\nOriginal string:\n\n",
      chatString
    );
    return [];
  }
};

export const mapToChatDialogProps = (
  context: ChatResponse[],
  question: string | null,
  answer: string | null
): ChatDialogProps[] => {
  const chatData: ChatDialogProps[] = context.flatMap((chat) => {
    const message = chat.IsService ? chat.AdminReply : chat.UserMsg;
    const robotMsg = chat.RobotMsg;
    const messageTyep = () => {
      switch (chat.AdminAction) {
        case 0:
          return MessageType.Bad;
        case 1:
          return MessageType.Changed;
        case 2:
          return MessageType.Good;
        default:
          return MessageType.Normal;
      }
    };

    const userOrServiceMessage: ChatDialogProps = {
      id: chat.ChatId,
      type: chat.IsService ? ChatType.CustomerSupport : ChatType.User,
      datetime: chat.CreateDate,
      message: message,
      isActive: chat.IsService ? answer === message : question === message,
    };

    const robotMessageObj: ChatDialogProps | null = robotMsg
      ? {
          id: chat.ChatId,
          type: ChatType.JokerBot,
          datetime: chat.CreateDate,
          message: robotMsg,
          isActive: answer === message,
          messageType: messageTyep(),
        }
      : null;

    return robotMessageObj
      ? [userOrServiceMessage, robotMessageObj]
      : [userOrServiceMessage];
  });
  return chatData;
};
