import { createContext, useState } from "react";
import Dialog, { DialogStyle } from "../components/dialog/Dialog";

export interface DialogContextType {
  showDialog: (style: DialogStyle, id: number, question: string, answer?: string,) => void;
}

export const DialogContext = createContext<DialogContextType>(
  {} as DialogContextType
);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [showingDialog, setShowingDialog] = useState(false);
  const [dialogQuestion, setDialogQuestion] = useState("");
  const [dialogAnswer, setDialogAnswer] = useState<string>();
  const [dialogId, setDialogId] = useState<number>(0);

  const [dialogStyle, setDialogStyle] = useState<DialogStyle>(
    DialogStyle.Default
  );

  const showDialog = (
    style: DialogStyle,
    id: number,
    question: string,
    answer?: string,

  ) => {
    setDialogQuestion(question);
    setDialogAnswer(answer);
    setDialogStyle(style);
    setShowingDialog(true);
    setDialogId(id)
  };

  const value = {
    showDialog,
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
      />
    </DialogContext.Provider>
  );
};
