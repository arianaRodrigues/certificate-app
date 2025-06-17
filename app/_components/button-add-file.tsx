"use client";
import { Button } from "@/app/_components/ui/button";
import { Import } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { DialogAddFile } from "./dialog-add-file";

type ButtonAddFileProps = {
  setImportErrors: Dispatch<SetStateAction<string[] | null>>;
};

export const ButtonAddFile = ({ setImportErrors }: ButtonAddFileProps) => {
  const [dialogUpsertIsOpen, setDialogUpsertIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={dialogUpsertIsOpen} onOpenChange={setDialogUpsertIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Import />
          Importar Planilha
        </Button>
      </DialogTrigger>

      <DialogAddFile
        onSuccess={() => setDialogUpsertIsOpen(false)}
        setImportErrors={setImportErrors}
      />
    </Dialog>
  );
};
