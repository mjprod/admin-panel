import { createContext, useState } from "react";
import Dialog, { DialogShownFromType, DialogStyle } from "../components/dialog/Dialog";

export interface DialogContextType {
  showDialog: (style: DialogStyle, id: number, question: string, answer: string, dialogShownFromType?: DialogShownFromType
  ) => void;

  dismissDialog: () => void;
}

export const DialogContext = createContext<DialogContextType>(
  {} as DialogContextType
);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [showingDialog, setShowingDialog] = useState(false);
  const [dialogQuestion, setDialogQuestion] = useState("");
  const [dialogAnswer, setDialogAnswer] = useState<string>("");
  const [dialogId, setDialogId] = useState<number>(0);
  const [dialogShownFromType, setdialogShownFromType] = useState<DialogShownFromType>(0);

  const [dialogStyle, setDialogStyle] = useState<DialogStyle>(
    DialogStyle.Default
  );

  const showDialog = (
    style: DialogStyle,
    id: number,
    question: string,
    answer: string,
    dialogShownFromType?: DialogShownFromType


  ) => {
    setDialogQuestion(question);
    setDialogAnswer(answer);
    setDialogStyle(style);
    setShowingDialog(true);
    setDialogId(id)
    setdialogShownFromType(dialogShownFromType ? dialogShownFromType : DialogShownFromType.Context)
  };

  const dismissDialog = () => {
    setShowingDialog(false)
  }

  const value = {
    showDialog,
    dismissDialog,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        dialogStyle={dialogStyle}
        question={dialogQuestion}
        answer={dialogAnswer}
        id={dialogId}
        isShowing={showingDialog}
        setShowDialog={setShowingDialog}
        dialogShownFromType={dialogShownFromType}
      />
    </DialogContext.Provider>
  );
};
