import { z } from "zod";
import { InterviewType } from "@/lib/shared/enums";

export const createInterviewSchema = z.object({
    type: z.enum(InterviewType),
    scheduledAt: z.coerce.date(),
    interviewerName: z.string().optional(),
    notes: z.string().optional(),
});

export const updateInterviewSchema =
    createInterviewSchema.partial().refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least one field must be updated" }
    );
