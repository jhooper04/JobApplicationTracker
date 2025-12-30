import { describe, it, expect } from "vitest";
import { createNoteSchema, updateNoteSchema } from "@/lib/zod/note";

describe("createNoteSchema", () => {
    it("accepts valid note data", () => {
        const result = createNoteSchema.safeParse({
            content: 'learn X framework',
        });

        expect(result.success).toBe(true);
    });

    it("rejects missing required fields", () => {
        const result = createNoteSchema.safeParse({});

        expect(result.success).toBe(false);
    });
});

describe("updateNoteSchema", () => {
    it("accepts partial updates", () => {
        const result = updateNoteSchema.safeParse({
            content: 'learn X framework',
        });

        expect(result.success).toBe(true);
    });

    it("rejects empty update payload", () => {
        const result = updateNoteSchema.safeParse({});

        expect(result.success).toBe(false);
    });
});
