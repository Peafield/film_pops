import { cn } from "@/utils/cn";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

type CustomToastProps = {
	variant: "success" | "info" | "error";
	message: string;
};

export function CustomToast({ variant, message }: CustomToastProps) {
	return (
		<div
			className={cn(
				"bg-gray-700/50 border-l-4 p-3 mb-6 rounded animate-fade-in",
				{
					"border-emerald-500": variant === "success",
					"border-red-500": variant === "error",
					"border-indigo-500": variant === "info",
				},
			)}
		>
			<div className="flex items-start">
				<div
					className={cn("flex-shrink-0 mr-2 mt-0.5", {
						"text-emerald-400": variant === "success",
						"text-red-400": variant === "error",
						"text-indigo-400": variant === "info",
					})}
				>
					{variant === "success" ? (
						<FaCheck />
					) : variant === "error" ? (
						<FaXmark />
					) : (
						<FaInfoCircle />
					)}
				</div>
				<p className="text-sm text-gray-300">{message}</p>
			</div>
		</div>
	);
}
