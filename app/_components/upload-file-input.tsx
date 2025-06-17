import { filesize } from "filesize";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpToLine } from "lucide-react";
import { Controller } from "react-hook-form";
import { UploadMessage } from "./upload-message";
import { FileSelectedInput } from "./file-selected-input";

export type UploadedFile = {
  file: File;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
};

interface UploadFileInputProps {
  control: any;
  name: string;
  field: any;
  multiple: boolean;
  onFileChange?: (_file: UploadedFile | UploadedFile[] | null) => void;
}

function mapExtensionsToMimeTypes(extensions: string[]) {
  const mimeTypes: Record<string, string> = {
    csv: "text/csv",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
  };

  const result: Record<string, string[]> = {};

  extensions.forEach((ext) => {
    const mime = mimeTypes[ext];
    if (mime) {
      if (!result[mime]) {
        result[mime] = [];
      }
      result[mime].push(`.${ext}`);
    }
  });

  return result;
}

export const UploadFileInput: React.FC<UploadFileInputProps> = ({
  control,
  name,
  field,
  multiple,
  onFileChange,
}) => {
  const filesAccepted = ["csv", "xls", "xlsx", "xlsm", "ods"];
  const [fileUploaded, setFileUploaded] = useState<
    UploadedFile | UploadedFile[] | null
  >(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (fileError) {
      const timeout = setTimeout(() => {
        setFileError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [fileError]);

  useEffect(() => {
    if (!onFileChange) return;

    if (fileUploaded) onFileChange(fileUploaded);
    else onFileChange(null);
  }, [fileUploaded, onFileChange]);

  function validateFileUploaded(files: FileList) {
    setFileError(null);

    if (files.length === 0) {
      setFileError("Nenhum arquivo válido foi enviado.");
      return;
    }

    let uploadedFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log("3");
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!filesAccepted.includes(extension!)) {
        setFileError("Tipo de arquivo não suportado.");
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      };

      uploadedFiles.push(uploadedFile);
    }

    if (multiple) {
      setFileUploaded(uploadedFiles);
      if (field) field.onChange(files);
    } else {
      setFileUploaded(uploadedFiles[0]);
      if (field) field.onChange(files[0]);
    }
  }

  const onDropAccepted = (files: any) => {
    validateFileUploaded(files);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: mapExtensionsToMimeTypes(filesAccepted),
      onDropAccepted,
      multiple: multiple,
      onDropRejected: () => {
        setFileError("Arquivo não suportado ou inválido.");
      },
    });

  const renderDragMessage = () => {
    if (fileError) {
      return <UploadMessage type="error">{fileError}</UploadMessage>;
    }

    if (!isDragActive) {
      return (
        <UploadMessage>
          Clique para inserir ou arraste seu arquivo aqui
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado.</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui!</UploadMessage>;
  };

  const iconColor = isDragReject
    ? "text-red-500"
    : isDragActive
    ? "text-green-500"
    : "text-primary";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col items-center justify-around rounded-lg border border-gray-300 p-2">
          {!fileUploaded && (
            <div
              {...getRootProps()}
              className="flex w-full cursor-pointer flex-col items-center justify-center p-3 transition-all duration-200"
            >
              <ArrowUpToLine size={24} className={iconColor} />
              <input
                type="file"
                {...getInputProps()}
                accept={filesAccepted.map((ext) => `.${ext}`).join(",")}
                onChange={(event) => {
                  const files = event.target.files;
                  if (!files || files.length < 1) {
                    return;
                  }

                  validateFileUploaded(event.target.files!);
                }}
              />
              {renderDragMessage()}
              <span className="mt-0 text-center text-slate-400">
                Formatos suportados: {filesAccepted.join(", ")}
              </span>
            </div>
          )}

          <FileSelectedInput
            file={fileUploaded}
            setFileUploaded={setFileUploaded}
            field={field}
            control={control}
          />
        </div>
      )}
    />
  );
};
