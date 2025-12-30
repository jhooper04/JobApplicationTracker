import { describe, it, expect, vi } from "vitest";
import { ApplicationStatus } from "@/lib/shared/enums";

vi.mock("@/lib/prisma", () => ({
    prisma: {
        jobApplication: {
            create: vi.fn().mockResolvedValue({
                companyName: "Acme Corp",
                jobTitle: "Frontend Engineer",
                location: "Remote",
                appliedDate: new Date(),
                status: ApplicationStatus.APPLIED,
            }),
        },
    },
}));

import { POST } from "@/app/api/applications/route";

describe("POST /applications", () => {
    it("returns 400 for invalid payload", async () => {
        const req = new Request("http://localhost", {
            method: "POST",
            body: JSON.stringify({}),
        });

        const res = await POST(req);

        expect(res.status).toBe(400);
    });
});
