import { create } from "zustand";

type MenuButtonsState = {
	isConsoleOpen: boolean;
	setIsConsoleOpen: (v: boolean) => void;

	isIssuesOpen: boolean;
	setIsIssuesOpen: (v: boolean) => void;

	setAll: (v: boolean) => void;
};

export const useMenuButtonsStore = create<MenuButtonsState>((set) => ({
	isConsoleOpen: false,
	isIssuesOpen: false,

	setIsConsoleOpen: (v) => set({ isConsoleOpen: v }),
	setIsIssuesOpen: (v) => set({ isIssuesOpen: v }),
	setAll: (v) => set({ isConsoleOpen: v, isIssuesOpen: v }),
}));
