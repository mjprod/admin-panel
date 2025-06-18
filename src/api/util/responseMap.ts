import {
  ChatDialogProps,
  MessageType,
  ChatType,
} from "../../components/popUp/popUpChatHistory/ChatDialog";
import { Category } from "../../util/ExampleData";
import { updateHslaValues, hexToHsla } from "../../util/ExtensionFunction";
import {
  KnowledgeResponse,
  ConversationKnowledge,
  KnowledgeCard,
  KnowledgeStatus,
  KnowledgeContext,
  ChatResponse,
} from "../responsePayload/KnowledgeResponse";
/* eslint-disable complexity */

export const mapKnowledgeConversationData = (
  response: KnowledgeResponse
): ConversationKnowledge => {
  const knowledgeinfo: KnowledgeCard[] = [];

  response.results.forEach((item) => {
    item.knowledge_content.forEach((knowledgeContent) => {
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

      const context = mapToKnowledgeContext(item.context?.context);

      knowledgeinfo.push({
        knowledgeId: item.id,
        conversationId: item.knowledge_uuid,
        category: categories,
        subcategories: item.subcategory,
        id: knowledgeContent.id,
        dateTime: knowledgeContent.last_updated,
        question: knowledgeContent.question,
        answer: knowledgeContent.answer,
        isEdited: knowledgeContent.is_edited,
        inBrain: knowledgeContent.in_brain,
        status: status,
        context: context,
      });
    });
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
  context: string | undefined
): KnowledgeContext | null => {
  const contextJsonArray = mapToChatResponse(context);

  const chatData: ChatDialogProps[] = mapToChatDialogProps(contextJsonArray);

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
  context: ChatResponse[]
): ChatDialogProps[] => {
  const chatData: ChatDialogProps[] = context.flatMap((chat) => {
    const message = chat.IsService ? chat.AdminReply : chat.UserMsg;
    const robotMsg = chat.RobotMsg;
    const nextAdminAction = chat.AdminAction;
    // const nextAdminAction = array[index + 1]?.AdminAction;
    const image = chat.ImgUrl;
    const messageTyep = () => {
      switch (nextAdminAction) {
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
      isActive: chat.IsService ? chat.AdminReply == chat.RobotMsg : false,
      isChatFailure: chat.IsService
        ? chat.AdminAction == 0 && chat.RobotMsg != ""
        : false,
      ...(image ? { image: `${image}` } : {}),
    };

    const robotMessageObj: ChatDialogProps | null = robotMsg
      ? {
          id: chat.ChatId,
          type: ChatType.JokerBot,
          datetime: chat.CreateDate,
          message: robotMsg,
          isActive: chat.IsService ? chat.AdminReply == chat.RobotMsg : false,
          isChatFailure: chat.IsService
            ? chat.AdminAction == 0 && chat.RobotMsg != ""
            : false,
          messageType: messageTyep(),
        }
      : null;

    return robotMessageObj
      ? [userOrServiceMessage, robotMessageObj]
      : [userOrServiceMessage];
  });
  return chatData;
};
