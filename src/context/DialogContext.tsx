import { createContext, useState } from "react";
import Dialog, { DialogStyle } from "../components/dialog/Dialog";

export interface DialogContextType {
  showDialog: (style: DialogStyle, title: string, description?: string) => void;
}

export const DialogContext = createContext<DialogContextType>(
  {} as DialogContextType
);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [showingDialog, setShowingDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState<string>();
  const [dialogStyle, setDialogStyle] = useState<DialogStyle>(
    DialogStyle.Default
  );

  const showDialog = (
    style: DialogStyle,
    title: string,
    description?: string
  ) => {
    setDialogTitle(title);
    setDialogDescription(description);
    setDialogStyle(style);
    setShowingDialog(true);
  };

  const value = {
    showDialog,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        dialogStyle={dialogStyle}
        textTitle={dialogTitle}
        textBody={dialogDescription}
        isShowing={showingDialog}
        setShowDialog={setShowingDialog}
      />
    </DialogContext.Provider>
  );
};
