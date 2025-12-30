import { prisma } from "@/lib/prisma";
import { createInterviewSchema } from "@/lib/zod/interview";
import { ok, badRequest } from "@/lib/api/responses";

export async function POST(
    req: Request,
    { params }: { params: { applicationId: string } }
) {
    const body = await req.json();
    const parsed = createInterviewSchema.safeParse(body);

    if (!parsed.success) return badRequest("Invalid interview");

    const interview = await prisma.interview.create({
        data: {
            ...parsed.data,
            applicationId: params.applicationId,
        },
    });
    return ok(interview, 201);
}
