import { FileWarning } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type AlertDialogButtonUploadedErrorsProps = {
  importErrors: string[] | null;
};

function formatErrorMessage(error: string) {
  const formatted = error.replace(
    /"(.*?)"/g,
    (_, match) => `<span class="font-semibold text-zinc-900">"${match}"</span>`
  );

  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
}

export const AlertDialogButtonUploadedErrors = ({
  importErrors,
}: AlertDialogButtonUploadedErrorsProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="relative inline-block cursor-pointer">
          <FileWarning size={28} />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
            !
          </span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-[95vw] h-[80vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Histórico de erros da importação</AlertDialogTitle>
          <AlertDialogDescription>
            Foram encontrados erros durante o processo de importação. Confira os
            detalhes{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ul className="mt-2 list-disc list-inside space-y-2 text-sm text-zinc-700 py-4 px-3 overflow-y-auto">
          {importErrors &&
            importErrors.map((err, idx) => (
              <li className="marker:text-red-500" key={idx}>
                {formatErrorMessage(err)}
              </li>
            ))}
        </ul>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Fechar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
