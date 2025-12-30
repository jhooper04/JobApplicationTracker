import { describe, it, expect } from "vitest";
import { createApplicationSchema, updateApplicationSchema } from "@/lib/zod/application";
import { ApplicationStatus } from "@/lib/shared/enums";

describe("createApplicationSchema", () => {
    it("accepts valid application data", () => {
        const result = createApplicationSchema.safeParse({
            companyName: "Acme Corp",
            jobTitle: "Frontend Engineer",
            location: "Remote",
            appliedDate: new Date(),
            status: ApplicationStatus.APPLIED,
        });

        expect(result.success).toBe(true);
    });

    it("rejects missing required fields", () => {
        const result = createApplicationSchema.safeParse({
            jobTitle: "Frontend Engineer",
        });

        expect(result.success).toBe(false);
    });

    it("rejects invalid enum values", () => {
        const result = createApplicationSchema.safeParse({
            companyName: "Acme Corp",
            jobTitle: "Frontend Engineer",
            location: "Remote",
            appliedDate: new Date(),
            status: "INVALID_STATUS",
        });

        expect(result.success).toBe(false);
    });
});

describe("updateApplicationSchema", () => {
    it("accepts partial updates", () => {
        const result = updateApplicationSchema.safeParse({
            status: ApplicationStatus.INTERVIEWING,
        });

        expect(result.success).toBe(true);
    });

    it("rejects empty update payload", () => {
        const result = updateApplicationSchema.safeParse({});

        expect(result.success).toBe(false);
    });
});
