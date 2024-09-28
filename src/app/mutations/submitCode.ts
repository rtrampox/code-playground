import { Language, languages } from "@/lib/types";
import axios from "axios";

export const submitCode = async (code: string, language: Language) => {
	const lang = languages[language];

	return await axios.post("https://apis.rtrampox.cloud/piston/api/v2/execute", {
		language: lang.language,
		version: lang.version,
		files: [
			{
				name: `playground.${lang.filetype}`,
				content: code,
			},
		],
	});
};
