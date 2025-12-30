import { prisma } from "@/lib/prisma";
import { updateApplicationSchema } from "@/lib/zod/application";
import { ok, badRequest, notFound } from "@/lib/api/responses";

export async function GET(
    _: Request,
    { params }: { params: { applicationId: string } }
) {
    const application = await prisma.jobApplication.findUnique({
        where: { id: params.applicationId },
        include: { interviews: true, notes: true },
    });

    if (!application) return notFound();

    return ok(application);
}

export async function PUT(
    req: Request,
    { params }: { params: { applicationId: string } }
) {
    const body = await req.json();
    const parsed = updateApplicationSchema.safeParse(body);

    if (!parsed.success) return badRequest("Invalid update data");

    const updated = await prisma.jobApplication.update({
        where: { id: params.applicationId },
        data: parsed.data,
    });

    return ok(updated);
}

export async function DELETE(
    _: Request,
    { params }: { params: { applicationId: string } }
) {
    const result = await prisma.jobApplication.deleteMany({
        where: { id: params.applicationId },
    });

    if (result.count === 0) {
        return notFound();
    }

    return ok({ success: true });
}