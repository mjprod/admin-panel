import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllConversation } from "../api/auth";
import { ConversationKnowledge, KnowledegeStatus, KnowledgeCard, KnowledgeResponse, Language } from "../api/responsePayload/KnowledgeResponse";
import { LanguageProps } from "../components/language/Language";
import { DEFAULT_LANGUAGE_CODE } from "../api/contants";

interface onConversationState {
  conversationList: ConversationKnowledge;
}

const initialState: onConversationState = {
  conversationList: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    next: null,
    previous: null,
    data: [],
  },
};


export const onConversationListSlice = createSlice({
  name: "on-conversation",
  initialState: initialState,
  reducers: {
    setConversationList: (state, action: PayloadAction<ConversationKnowledge>) => {
      state.conversationList = action.payload;
    },
    // updateConversation: (state, action: PayloadAction<ConversationKnowledge>) => {
    //   console.log(`-----Answer----: ${action.payload.answer}`);
    //   const convers = state.conversationList.findIndex(
    //     (con) => con.id == action.payload.id
    //   );
    //   state.conversationList[convers] = action.payload;
    // },
  },
});

export const getConversationList = () => {
  return async (dispatch: any) => {
    try {
      const res = await AllConversation({}, {page: "1"});
      if (res != null) {
        console.log(`----id: ${res.count}`);
        dispatch(onConversationActions.setConversationList(mapKnowledgeConversationData(res)));
      }
    } catch (error) {
      throw error;
    }
  };
};

const mapKnowledgeConversationData = (response: KnowledgeResponse): ConversationKnowledge => {
  console.log(`----id: ${response.count}`);

  const knowledgeinfo: KnowledgeCard[] = [];


  response.results.map((item) => {
    const getLanguageByCode = (code: string) => 
      Object.values(Language).find(lang => lang.code === code) || Language.MALAYSIAN;
    
    const getLanguageById = (id: number) => 
      Object.values(Language).find(lang => lang.id === id) || Language.MALAYSIAN;
    

    const knowledgeContent = item.knowledge_content.find((con) => con.language == getLanguageByCode(DEFAULT_LANGUAGE_CODE).id)
    console.log("----print-----", getLanguageByCode(DEFAULT_LANGUAGE_CODE).id)

   
    const langStatus: LanguageProps[] = item.knowledge_content.map((lang) => ({
      id: lang.language,
      lang: getLanguageById(lang.language).code,
      langLabel: getLanguageById(lang.language).label,
      isSolid: lang.language ==  getLanguageByCode(DEFAULT_LANGUAGE_CODE).id,
      isCompleted: lang.status == KnowledegeStatus.Approved,
      status: KnowledegeStatus[lang.status] 
    }))

    
    if (knowledgeContent != null) {
      const status: KnowledegeStatus = (() => {
        switch (knowledgeContent.status) {
          case 1:
            return KnowledegeStatus.NeedReview;
          case 2:
            return KnowledegeStatus.PreApproved;
          case 3:
              return KnowledegeStatus.Approved;
          case 4:
            return KnowledegeStatus.Rejected;
          default:
            return KnowledegeStatus.Approved;
        }
      })();

      const lang: LanguageProps = {
        id: knowledgeContent.language,
        lang: getLanguageById(knowledgeContent.language).code,
        langLabel: getLanguageById(knowledgeContent.language).label,
        isSolid: knowledgeContent.language ==  getLanguageByCode(DEFAULT_LANGUAGE_CODE).id,
        isCompleted: knowledgeContent.status == KnowledegeStatus.Approved,
        status: KnowledegeStatus[knowledgeContent.status] 
      }

      knowledgeinfo.push({
        knowledgeId: item.id,
        conversationId: item.knowledge_uuid,
        category: item.category ? item.category : null,
        subcategories: item.subcategory ? item.subcategory : null,
        id: knowledgeContent.id,
        dateTime: knowledgeContent.last_updated,
        languages: langStatus,
        currentlang: lang,
        question: knowledgeContent.question,
        answer: knowledgeContent.answer,
        isEdited: knowledgeContent.is_edited,
        inBrain: knowledgeContent.in_brain,
        status: status
        
      });
    }

  })


  return {
    count: response.count,
    total_pages: response.total_pages,
    current_page: response.current_page,
    next: response.next,
    previous: response.previous,
    data: knowledgeinfo,
  };
  
}

export const onConversationActions = onConversationListSlice.actions;

export default onConversationListSlice.reducer;
