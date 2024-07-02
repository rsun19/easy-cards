import { signIn } from "../../../auth";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<void> {
  await signIn("google", { redirectTo: "/api/token/request" });
}
