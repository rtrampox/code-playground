import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "./providers/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		default: "Code Playground",
		template: "%s - Playground",
	},
	description:
		"Welcome to Code Playground, a place to learn and practice coding.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-secondary font-sans antialiased",
					geistSans.className,
					geistMono.className,
				)}
			>
				<ReactQueryProvider>
					{children}
					<Toaster />
				</ReactQueryProvider>
			</body>
		</html>
	);
}
