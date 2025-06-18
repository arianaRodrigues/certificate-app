"use server";

import { revalidatePath } from "next/cache";

const apiUrl = "https://api-cert-c9xz.onrender.com/students";

export const uploadFileAction = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Erro ao importar planilha");
    }

    revalidatePath(`/`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllStudentsData = async (): Promise<StudentType[]> => {
  try {
    const response = await fetch(`${apiUrl}`);
    console.log(response);
    if (!response.ok) {
      throw new Error("Erro ao certificados");
    }

    return await response.json();
  } catch (error: any) {
    throw error;
  }
};
