"use client";

import { containerVariants, itemVariants } from "@/utils/motionVariants";
import DOMPurify from "isomorphic-dompurify";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

export function PendingApproval() {
	const searchParams = useSearchParams();
	const unsafeUsername = searchParams.get("username") || "Pops";
	const username = DOMPurify.sanitize(unsafeUsername);
	return (
		<motion.div variants={containerVariants} initial="hidden" animate="visible">
			<section className="mx-auto space-y-6 border border-gray-800 p-4 rounded-xl">
				<motion.div variants={itemVariants} className="text-start">
					<h1 className="text-xl">
						Thanks for signing up,{" "}
						<span className="text-amber-800 text-xl">{username}</span>!
					</h1>
				</motion.div>
				<motion.div variants={itemVariants} className="text-start">
					<p className="text-gray-400">
						Admin will approve your account <strong>asap</strong> if you're
						meant to be here!
					</p>
					<p className="text-gray-400 mt-2">
						You can close this page and you'll be notified once approved.
					</p>
				</motion.div>
			</section>
		</motion.div>
	);
}
