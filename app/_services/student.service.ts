type ImportResponse =
  | { type: "error"; error: string }
  | {
      type: "success";
      message: string;
      successCount: number;
      errorCount?: number;
      errors?: string[];
    };

const apiUrl = https://api-cert-c9xz.onrender.com/students

export const getAllStudentsData = async (): Promise<StudentType[]> => {
  try {
    const response = await fetch(`${apiUrl}/students`);

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

    const response = await fetch(`${apiUrl}/students/upload`, {
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
