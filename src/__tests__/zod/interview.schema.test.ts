import { describe, it, expect } from "vitest";
import { createInterviewSchema, updateInterviewSchema } from "@/lib/zod/interview";
import { InterviewType } from "@/lib/shared/enums";

describe("createInterviewSchema", () => {
    it("accepts valid interview data", () => {
        const result = createInterviewSchema.safeParse({
            type: InterviewType.TECHNICAL,
            scheduledAt: new Date(),
            interviewerName: "John Smith",
            notes: 'show up early',
        });

        expect(result.success).toBe(true);
    });

    it("accepts interview data missing optional fields", () => {
        const result = createInterviewSchema.safeParse({
            type: InterviewType.PHONE,
            scheduledAt: new Date(),
        });

        expect(result.success).toBe(true);
    });

    it("rejects missing required fields", () => {
        const result = createInterviewSchema.safeParse({
            interviewerName: "John Smith",
        });

        expect(result.success).toBe(false);
    });

    it("rejects invalid enum values", () => {
        const result = createInterviewSchema.safeParse({
            type: 'Invalid Status',
            scheduledAt: new Date(),
            interviewerName: "John Smith",
            notes: 'show up early',
        });

        expect(result.success).toBe(false);
    });
});

describe("updateInterviewSchema", () => {
    it("accepts partial updates", () => {
        const result = updateInterviewSchema.safeParse({
            type: InterviewType.TECHNICAL,
        });

        expect(result.success).toBe(true);
    });

    it("rejects empty update payload", () => {
        const result = updateInterviewSchema.safeParse({});

        expect(result.success).toBe(false);
    });
});
