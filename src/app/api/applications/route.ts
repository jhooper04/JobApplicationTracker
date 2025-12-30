import { prisma } from "@/lib/prisma";
import { createApplicationSchema } from "@/lib/zod/application";
import { ok, badRequest } from "@/lib/api/responses";

export async function GET() {
    const applications = await prisma.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
    });

    return ok(applications);
}

export async function POST(req: Request) {
    const body = await req.json();
    const parsed = createApplicationSchema.safeParse(body);

    if (!parsed.success) {
        return badRequest("Invalid application data");
    }

    const application = await prisma.jobApplication.create({
        data: parsed.data,
    });

    return ok(application, 201);
}