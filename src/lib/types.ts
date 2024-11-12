export type PistonAPIResponse = {
	run: {
		signal: null;
		stdout: string;
		stderr: string;
		code: number;
		output: string;
		memory: number;
		message: string | null;
		status: string | null;
		cpu_time: number;
		wall_time: number;
	};
	language: string;
	version: string;
};

export type Language = "typescript" | "javascript" | "go" | "python";

export const languages: Record<
	Language,
	{ language: Language; version: string; filetype: string }
> = {
	typescript: { language: "typescript", version: "5.0.3", filetype: "ts" },
	javascript: { language: "javascript", version: "20.11.1", filetype: "js" },
	go: { language: "go", version: "1.16.2", filetype: "go" },
	python: { language: "python", version: "3.10.0", filetype: "py" },
};

export type Files = {
	name: string;
	content: string;
}[];
