import { fetchCardByLink, updateCard } from "@/lib/controllers/CardController";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return fetchCardByLink(id);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return updateCard(req, id);
}
