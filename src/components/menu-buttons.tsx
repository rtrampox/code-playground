"use client";

import { Language, PistonAPIResponse } from "@/lib/types";
import { AlertTriangle, Braces, CircleAlert, Loader2, Play, SquareChevronRight, XIcon } from "lucide-react";
import { LanguageDropdown } from "./language-dropdown";
import { Markers } from "./editor";
import { useMenuButtonsStore } from "@/app/stores/menubuttons";

export function MenuButtons({
	isPending,
	consoleData,
	runCode,
	language,
	setLanguage,
	errors,
}: {
	runCode?: () => void;
	consoleData?: PistonAPIResponse;
	errors: Markers;
	isPending: boolean;
	language: Language;
	setLanguage: (v: Language) => void;
}) {
	const { isConsoleOpen, setIsConsoleOpen, isIssuesOpen, setIsIssuesOpen } = useMenuButtonsStore();

	const isError = consoleData && consoleData.run.code !== 0;

	return (
		<div className="flex flex-col-reverse w-[99%] absolute bottom-2 left-0 bg-neutral-900 text-white font-mono border border-neutral-950">
			<div className="flex flex-row gap-2 justify-start items-center p-1 h-10 border border-neutral-950/60">
				<div className="flex flex-row gap-2 items-center justify-between w-full">
					<div className="flex flex-row gap-2 items-center">
						<button
							className={`flex flex-row gap-2 items-center p-1 ${isConsoleOpen && "bg-neutral-700"} ${isError && "text-red-500"}`}
							onClick={() => setIsConsoleOpen(!isConsoleOpen)}
						>
							<SquareChevronRight size={15} />
							<p>Console</p>
							{isError ? <AlertTriangle size={15} className="text-red-500" /> : null}
						</button>

						<div className="w-[1px] h-full bg-white" />

						<button
							className={`flex flex-row gap-2 items-center p-1 ${isIssuesOpen && "bg-neutral-700"} ${errors.length > 0 && "text-red-500"}`}
							onClick={() => setIsIssuesOpen(!isIssuesOpen)}
						>
							<CircleAlert size={15} />
							<p>Issues</p>
							{errors.length > 0 ? (
								<div className="size-5 rounded-full text-red-500 text-center flex items-center">
									{errors.length}
								</div>
							) : null}
						</button>

						<div className="w-[1px] h-full bg-white" />

						<button
							className="flex flex-row gap-2 items-center p-1 disabled:opacity-50"
							onClick={runCode}
							disabled={isPending}
						>
							<Play size={15} />
							<p>Run Code</p>
							{isPending ? <Loader2 className="animate-spin" size={15} /> : null}
						</button>
					</div>
					<div>
						<p className="text-sm font-sans mr-2 flex flex-row gap-2 items-center">
							<Braces size={15} />
							<LanguageDropdown language={language} setLanguage={setLanguage}>
								{language}
							</LanguageDropdown>
						</p>
					</div>
				</div>
			</div>
			{isConsoleOpen && (
				<>
					<div className="bg-neutral-900 p-4 w-full h-40 text-white bottom-12 space-y-2 left-0">
						<div className="flex flex-row gap-2 justify-between items-center">
							<p>Output:</p>
							<XIcon size={15} onClick={() => setIsConsoleOpen(false)} />
						</div>
						<div
							className={`border ${isError ? "border-red-500" : "border-neutral-500 "} rounded-md overflow-y-auto h-24 p-2`}
						>
							{isPending ? (
								<div className="flex flex-row items-center justify-center h-full gap-1">
									<p>Running code</p>
									<Loader2 className="animate-spin" size={15} />
								</div>
							) : (
								<pre className={isError ? "text-red-500" : ""}>
									{consoleData && consoleData ? consoleData?.run.output : "Run the code to see output"}
								</pre>
							)}
						</div>
					</div>
				</>
			)}
			{isIssuesOpen && (
				<>
					<div className="bg-neutral-900 p-4 w-full h-40 text-white bottom-12 space-y-2 left-0">
						<div className="flex flex-row gap-2 justify-between items-center">
							<p>Errors:</p>
							<XIcon size={15} onClick={() => setIsIssuesOpen(false)} />
						</div>
						<div
							className={`border ${isError ? "border-red-500" : "border-neutral-500 "} rounded-md overflow-y-auto h-24 p-2`}
						>
							{errors
								? errors.map((e, i) => (
										<pre key={i} className={isError ? "text-red-500" : ""}>
											{e.message}
										</pre>
									))
								: "No errors"}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
