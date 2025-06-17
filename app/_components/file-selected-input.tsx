import { Button } from "@/app/_components/ui/button";
import { Paperclip, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

type FileSelectedInputProps = {
  file: any;
  setFileUploaded?: Dispatch<
    SetStateAction<UploadedFile | UploadedFile[] | null>
  >;
  field?: any;
  control?: any;
  setValue?: (_param1: any, _param2: any) => void;
};

type UploadedFile = {
  file: File;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
};

export const FileSelectedInput = ({
  file,
  setFileUploaded,
  field,
  setValue,
}: FileSelectedInputProps) => {
  let baseName = file?.originalName ? file.originalName : file?.file.name;
  let size = file?.size ? file.size : file?.readableSize;

  useEffect(() => {
    if (setValue && baseName) {
      setValue("file", baseName);
    }
  }, [baseName, setValue]);

  return (
    <div className="flex w-full items-center justify-between">
      {file && (
        <>
          <div className="flex items-center gap-4">
            <Paperclip size={22} className="ml-2" />
            <div className="flex flex-col justify-center break-all">
              <p>{baseName}</p>
              <p className="text-xs text-gray-400">
                <strong>Tamanho:</strong> {size}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              if (setFileUploaded) {
                setFileUploaded(null);
              }
              if (field) {
                field.onChange(null);
              }
            }}
            variant="ghost"
          >
            <Trash2 size={20} className="text-red-500" />
          </Button>
        </>
      )}
    </div>
  );
};
