import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data.json");

export async function GET() {
  const data = await fs.readFile(dataPath, "utf-8");
  return NextResponse.json(JSON.parse(data).fans);
}

export async function POST(request: Request) {
  const newFan = await request.json();
  const data = JSON.parse(await fs.readFile(dataPath, "utf-8"));

  data.fans.push({
    ...newFan,
    id: Date.now().toString(),
  });

  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return NextResponse.json(newFan, { status: 201 });
}
