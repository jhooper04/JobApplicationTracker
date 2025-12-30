import { prisma } from "@/lib/prisma";
import { updateNoteSchema } from "@/lib/zod/note";
import { ok, badRequest, notFound } from "@/lib/api/responses";

export async function PUT(
    req: Request,
    {
        params,
    }: {
        params: { applicationId: string; noteId: string };
    }
) {
    const body = await req.json();
    const parsed = updateNoteSchema.safeParse(body);

    if (!parsed.success) {
        return badRequest("Invalid note update data");
    }

    const note = await prisma.applicationNote.updateMany({
        where: {
            id: params.noteId,
            applicationId: params.applicationId,
        },
        data: parsed.data,
    });

    if (note.count === 0) return notFound();

    return ok({ success: true });
}
