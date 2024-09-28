import * as monaco from "@monaco-editor/react";
import { forwardRef } from "react";

export type IStandaloneCodeEditor = Parameters<monaco.OnMount>[0];
export type Markers = Parameters<monaco.OnValidate>[0];

export const CodeEditor = forwardRef<
	IStandaloneCodeEditor | null,
	monaco.EditorProps
>((props, ref) => {
	function onMount(editor: IStandaloneCodeEditor) {
		if (ref && typeof ref === "object") {
			ref.current = editor;
		}
		editor.focus();
	}

	return <monaco.Editor {...props} onMount={onMount} />;
});

CodeEditor.displayName = "CodeEditor";
