import { SkeletonCard } from "./SkeletonCard"; // Assuming path is correct

export function LoadingSkeleton({ count = 12 }: { count?: number }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{Array.from({ length: count }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<SkeletonCard key={index} />
			))}
		</div>
	);
}
