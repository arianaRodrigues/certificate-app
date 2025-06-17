"use server";

import { revalidatePath } from "next/cache";
import { importFileXlsx } from "../_services/student.service";

export const uploadFileAction = async (file: File) => {
  try {
    const result = await importFileXlsx(file);

    revalidatePath(`/`);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
