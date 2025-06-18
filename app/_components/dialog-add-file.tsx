import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DialogClose } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { FileSchema } from "../_schema/file.schema";
import { UploadFileInput } from "./upload-file-input";
import { toast } from "sonner";
import { uploadFileAction } from "../_actions/student.action";

type DialogAddFileProps = {
  onSuccess?: () => void;
  setImportErrors: Dispatch<SetStateAction<string[] | null>>;
};

export const DialogAddFile = ({
  onSuccess,
  setImportErrors,
}: DialogAddFileProps) => {
  const [requestServerError, setRequestServerError] = useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof FileSchema>>({
    resolver: zodResolver(FileSchema),
  });

  const onSubmit = async (values: any) => {
    try {
      const result = (await uploadFileAction(values.file)) as {
        type: "error" | "success";
        error?: string;
        errors?: string[];
        successCount?: number;
        errorCount?: number;
      };

      console.log(result, "---RESULT");

      if (result.type === "error") {
        toast.error(result.error);
      } else {
        if (result.errors?.length) {
          toast.warning(
            `${result.successCount} aluno(s) importado(s) com sucesso, mas ocorreram ${result.errorCount} erro(s).`
          );
          setImportErrors(result.errors);
        } else {
          toast.success("Todos os alunos foram importados com sucesso!");
        }
      }

      onSuccess?.();
    } catch (error: any) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Parece que estamos com problemas. Tente novamente mais tarde.";

      setRequestServerError(errorMessage);

      setTimeout(() => {
        setRequestServerError(null);
      }, 3000);
    }
  };

  return (
    <>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Adicionar Arquivo</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadFileInput
                        control={form.control}
                        name="file"
                        field={field}
                        multiple={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="reset">
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" size={16} />
                )}
                {form.formState.isSubmitting
                  ? "Adicionando..."
                  : "Adicionar no sistema"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};
