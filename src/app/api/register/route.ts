import { registerUser } from "@/lib/controllers/UserController";

export async function POST(req: Request) {
  return registerUser(req);
}
