"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { MenuButtons } from "@/components/menu-buttons";
import { submitCode } from "./mutations/submitCode";
import { CodeEditor, IStandaloneCodeEditor, Markers } from "@/components/editor";
import { Language } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useMenuButtonsStore } from "./stores/menubuttons";

export default function Home() {
	const { toast } = useToast();

	const editorRef = useRef<IStandaloneCodeEditor | null>(null);

	const { setIsConsoleOpen } = useMenuButtonsStore();
	const [code, setCode] = useState<string | undefined>(undefined);
	const [language, setLanguage] = useState<Language>("javascript");
	const [validationErrors, setValidationErrors] = useState<Markers>([]);

	const submit = useMutation({
		mutationFn: (data: string) => submitCode(data, language),
		onSuccess: async (data) => {
			setIsConsoleOpen(true);
			console.log("Output:\n\n", data.data.run.output);
		},
	});

	const storeCode = useDebouncedCallback((v) => {
		console.log("changes saved to local storage");
		window.localStorage.setItem("code", v ? v : "");
	}, 1000);

	const storeLanguage = useDebouncedCallback((v) => {
		console.log("changes saved to local storage");
		window.localStorage.setItem("language", v);
	}, 1000);

	useEffect(() => {
		const getCode = localStorage.getItem("code");
		const getLanguage = localStorage.getItem("language");
		if (getCode) {
			toast({
				description: "Welcome back! We restored the code from your last session.",
			});
			setCode(getCode);
		}
		if (getLanguage) {
			setLanguage(getLanguage as Language);
		}
	}, [toast]);

	useEffect(() => {
		storeCode(code);
		storeLanguage(language as Language);
	}, [code, storeCode, storeLanguage, language]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "Enter") {
				onSubmit();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	async function onSubmit() {
		if (editorRef.current?.getValue()) {
			await submit.mutateAsync(editorRef.current.getValue());
		}
	}

	function handleEditorValidation(markers: Markers) {
		// model markers
		setValidationErrors(markers);
		markers.forEach((marker) => console.log("Validation error:", marker.message));
	}

	return (
		<div className="h-full w-full justify-center items-center">
			<CodeEditor
				height="100vh"
				defaultLanguage={language}
				language={language}
				defaultValue={code}
				theme="vs-dark"
				onChange={setCode}
				value={code}
				ref={editorRef}
				onValidate={handleEditorValidation}
			/>
			<MenuButtons
				runCode={onSubmit}
				consoleData={submit.data?.data}
				isPending={submit.isPending}
				language={language}
				setLanguage={setLanguage}
				errors={validationErrors}
			/>
		</div>
	);
}
