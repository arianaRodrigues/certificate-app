type ImportResponse =
  | { type: "error"; error: string }
  | {
      type: "success";
      message: string;
      successCount: number;
      errorCount?: number;
      errors?: string[];
    };

export const getAllStudentsData = async (): Promise<StudentType[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students`);

    if (!response.ok) {
      throw new Error("Erro ao certificados");
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
};

export const importFileXlsx = async (file: File): Promise<ImportResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Erro ao importar planilha");
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};
