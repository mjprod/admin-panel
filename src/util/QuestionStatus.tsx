export enum QuestionStatus {
  NeedApproval = "need_approval", // 1
  PreApproved = "pre_approved", // 2
  // Approved = "approved", // 3
  Rejected = "rejected", // 4
}

const statusMap: Record<QuestionStatus, number> = {
  [QuestionStatus.NeedApproval]: 1,
  [QuestionStatus.PreApproved]: 2,
  // [QuestionStatus.Approved]: 3,
  [QuestionStatus.Rejected]: 4,
};

export const getStatusNumber = (status: QuestionStatus): number =>
  statusMap[status];
