"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const apiUrl = "https://api-cert-c9xz.onrender.com/students";
// const apiUrl = "http://localhost:3333/students";

export const uploadFileAction = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${apiUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath(`/`);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.error || "Erro ao buscar certificados";
    throw new Error(message);
  }
};

export const getAllStudentsData = async (): Promise<StudentType[]> => {
  try {
    const response = await axios.get<StudentType[]>(`${apiUrl}`);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.error || "Erro ao buscar certificados";
    throw new Error(message);
  }
};
