import { describe, it, expect, vi } from "vitest";
import { InterviewType } from "@/lib/shared/enums";

vi.mock("@/lib/prisma", () => ({
    prisma: {
        interview: {
            create: vi.fn().mockResolvedValue({
                id: '1',
                type: InterviewType.TECHNICAL,
                scheduledAt: new Date(),
                interviewerName: "John Smith",
                notes: 'show up early',
            }),
        },
    },
}));

import { POST } from "@/app/api/applications/[applicationId]/interviews/route";

describe("POST /interviews", () => {
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
