import { z } from "zod";

export const createNoteSchema = z.object({
    content: z.string().min(1),
});

export const updateNoteSchema =
    createNoteSchema.partial().refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least one field must be updated" }
    );
