import { prisma } from "@/src/lib/prisma";

export async function DELETE(request, { params }) {
  const jobId = parseInt(params.id);
  await prisma.job_opprtunities.delete({ where: { id: jobId } });
  return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}

export async function PUT(request, { params }) {
  const jobId = parseInt(params.id);
  const { post_status } = await request.json();
  const updated = await prisma.job_opprtunities.update({
    where: { id: jobId },
    data: { post_status },
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}
