import { prisma } from "@/lib/prisma";
import { updateInterviewSchema } from "@/lib/zod/interview";
import { ok, badRequest, notFound } from "@/lib/api/responses";

export async function PUT(
    req: Request,
    {
        params,
    }: {
        params: { applicationId: string; interviewId: string };
    }
) {
    const body = await req.json();
    const parsed = updateInterviewSchema.safeParse(body);

    if (!parsed.success) {
        return badRequest("Invalid interview update data");
    }

    const interview = await prisma.interview.updateMany({
        where: {
            id: params.interviewId,
            applicationId: params.applicationId,
        },
        data: parsed.data,
    });

    if (interview.count === 0) return notFound();

    return ok({ success: true });
}

export async function DELETE(
    _: Request,
    {
        params,
    }: {
        params: { applicationId: string; interviewId: string };
    }
) {
    const result = await prisma.interview.deleteMany({
        where: {
            id: params.interviewId,
            applicationId: params.applicationId,
        },
    });

    if (result.count === 0) {
        return notFound();
    }

    return ok({ success: true });
}
