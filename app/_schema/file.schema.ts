import { z } from "zod";

export const FileSchema = z.object({
  file: z.union([z.instanceof(File), z.object({}), z.string()]),
});
