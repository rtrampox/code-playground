import { Language, languages } from "@/lib/types";
import axios from "axios";

export const submitCode = async (code: string, language: Language) => {
	const lang = languages[language];

	return await axios.post("/api/v1/piston", {
		language,
		files: [
			{
				name: `playground.${lang.filetype}`,
				content: code,
			},
		],
	});
};
