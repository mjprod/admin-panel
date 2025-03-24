export enum SideCardType {
  Core = "core",
  MaxPanel = "max_panel",
  NeedApproval = "need_approval",
  PreApproved = "pre_approved",
  Rejected = "rejected",
  NONE = "",
}

export enum QuestionStatus {
  NeedApproval = 1, // 1
  PreApproved = 2, // 2
  Approved = 3, // 3
  Rejected = 4, // 4
}

export const getQuestionStatusFromSideCardType  = (type: SideCardType): QuestionStatus | null => {
  switch (type) {
    case SideCardType.NeedApproval:
      return QuestionStatus.NeedApproval;
    case SideCardType.PreApproved:
      return QuestionStatus.PreApproved;
    case SideCardType.Rejected:
      return QuestionStatus.Rejected;
    default:
      return null;
  }
};
