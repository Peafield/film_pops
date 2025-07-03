import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(
	...inputs: (
		| string
		| undefined
		| boolean
		| null
		| { [key: string]: boolean | undefined }
	)[]
): string {
	return twMerge(clsx(inputs));
}
