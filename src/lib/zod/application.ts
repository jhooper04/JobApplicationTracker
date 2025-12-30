import { z } from "zod";
import { ApplicationSource, ApplicationStatus } from "@/lib/shared/enums";

export const createApplicationSchema = z.object({
    companyName: z.string().min(1),
    jobTitle: z.string().min(1),
    location: z.string().min(1),
    isRemote: z.boolean().optional(),
    status: z.enum(ApplicationStatus).optional(),
    source: z.enum(ApplicationSource).optional(),
    appliedDate: z.coerce.date(),
});

export const updateApplicationSchema =
    createApplicationSchema.partial().refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least one field must be updated" }
    );