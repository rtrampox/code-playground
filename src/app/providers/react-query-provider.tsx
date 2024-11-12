"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createQueryClient } from "./create-query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return createQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	return (clientQueryClientSingleton ??= createQueryClient());
};

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
