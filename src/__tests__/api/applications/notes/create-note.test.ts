import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
    prisma: {
        applicationNote: {
            create: vi.fn().mockResolvedValue({
                id: '1',
                content: 'learn X framework',
            }),
        },
    },
}));

import { POST } from "@/app/api/applications/[applicationId]/notes/route";

describe("POST /notes", () => {
    it("returns 400 for invalid payload", async () => {
        const req = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({}),
        });

        const res = await POST(req, {
            params: { applicationId: "1" },
        });

        expect(res.status).toBe(400);
    });
});
