import { prisma } from "@/lib/prisma";
import { createNoteSchema } from "@/lib/zod/note";
import { ok, badRequest } from "@/lib/api/responses";

export async function POST(
    req: Request,
    { params }: { params: { applicationId: string } }
) {
    const body = await req.json();
    const parsed = createNoteSchema.safeParse(body);

    if (!parsed.success) return badRequest("Invalid note");

    const note = await prisma.applicationNote.create({
        data: {
            content: parsed.data.content,
            applicationId: params.applicationId,
        },
    });

    return ok(note, 201);
}
