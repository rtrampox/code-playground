"use client";

import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/lib/types";

export function LanguageDropdown({
	language,
	children,
	setLanguage,
}: {
	language: Language;
	children: React.ReactNode;
	setLanguage: (v: Language) => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={language} onValueChange={(v) => setLanguage(v as Language)}>
					<DropdownMenuRadioItem value="typescript">Typescript</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="javascript">Javascript</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="go">Go</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="python" disabled>
						Python
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
