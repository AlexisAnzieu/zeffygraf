import { Zeffy } from "@alexisanzieu/zeffy-api";
import { unstable_noStore as noStore } from "next/cache";

const zeffy = new Zeffy();

export async function POST(req: Request) {
  noStore();

  const { email, password } = await req.json();
  try {
    await zeffy.login(email, password);
    const { object } = await zeffy.getFrontendCurrentUser();
    return Response.json(object);
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
