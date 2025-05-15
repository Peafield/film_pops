import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "Film Pops",
	description: "Helping pops decide what to watch next!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased relative">
				<Toaster
					toastOptions={{
						duration: 7000,
						success: {
							duration: 5000,
						},
						style: {
							backgroundColor: "transparent",
							boxShadow: "none",
							padding: "0",
							width: "auto",
							animation: "fade-in 1s ease-in-out",
						},
						icon: "",
						position: "top-center",
					}}
				/>
				<Navigation />
				{children}
			</body>
		</html>
	);
}
