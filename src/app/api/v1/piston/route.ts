import { Files, Language, languages } from "@/lib/types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { language, files }: { language: Language; files: Files } =
		await req.json();

	console.log(language, files);

	const lang = languages[language];

	const data = await axios.post(
		"https://apis.rtrampox.cloud/piston/api/v2/execute",
		{
			language: lang.language,
			version: lang.version,
			files,
		},
	);

	return NextResponse.json(data.data, { status: data.status });
}
