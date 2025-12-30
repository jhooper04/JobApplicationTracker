import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
    prisma: {
        jobApplication: {
            updateMany: vi.fn().mockResolvedValue({ count: 0 }),
        },
    },
}));

import { PUT } from "@/app/api/applications/[applicationId]/route";

describe("PUT /applications", () => {
    it("returns 400 for invalid payload", async () => {
        const req = new Request("http://localhost", {
            method: "PUT",
            body: JSON.stringify({}),
        });

        const res = await PUT(req, {
            params: { applicationId: "1" },
        });

        expect(res.status).toBe(400);
    });
});
