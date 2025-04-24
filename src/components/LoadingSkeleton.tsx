import { UUID, randomUUID } from "node:crypto";
import { SkeletonCard } from "./SkeletonCard";

export function LoadingSkeleton({ count = 12 }: { count?: number }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{Array.from({ length: count }).map((_, index) => (
				<SkeletonCard key={randomUUID()} />
			))}
		</div>
	);
}
