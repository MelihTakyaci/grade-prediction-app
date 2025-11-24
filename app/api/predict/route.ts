import { NextResponse } from "next/server";
import { spawnSync } from "child_process";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Path to the python script
    const script = join(process.cwd(), "server", "predict.py");

    // Run python synchronously and pass JSON via stdin
    const py = spawnSync("python3", [script], {
      input: JSON.stringify(body),
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });

    if (py.error) {
      return NextResponse.json({ error: `failed to run python: ${py.error.message}` }, { status: 500 });
    }

    if (py.status !== 0) {
      // try to parse stderr JSON if present
      let errMsg = py.stderr || "unknown python error";
      try {
        const parsed = JSON.parse(errMsg);
        return NextResponse.json(parsed, { status: 500 });
      } catch (e) {
        return NextResponse.json({ error: errMsg }, { status: 500 });
      }
    }

    // parse stdout
    const out = py.stdout || "";
    try {
      const parsed = JSON.parse(out);
      return NextResponse.json(parsed);
    } catch (e) {
      return NextResponse.json({ error: "invalid python output", raw: out }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
