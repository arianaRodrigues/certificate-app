"use client";

import { Download } from "lucide-react";
import { ButtonAddFile } from "./button-add-file";
import { SubHeaderLeft, SubHeaderRight, SubHeaderTitle } from "./sub-header";
import { Button } from "./ui/button";

import { useState } from "react";
import { AlertDialogButtonUploadedErrors } from "./alert-dialog-button-uploaded-errors";

export const ButtonsMenu = () => {
  const [importErrors, setImportErrors] = useState<string[] | null>(null);
  console.log(importErrors, "Do button");
  return (
    <>
      <SubHeaderLeft>
        <SubHeaderTitle>Certificados de Alunos</SubHeaderTitle>
      </SubHeaderLeft>

      <SubHeaderRight>
        <div className="flex gap-4 items-center">
          {importErrors && (
            <AlertDialogButtonUploadedErrors importErrors={importErrors} />
          )}
          <ButtonAddFile setImportErrors={setImportErrors} />
          <Button className="cursor-pointer">
            <Download />
            Exportar
          </Button>
        </div>
      </SubHeaderRight>
    </>
  );
};
