import { easeInOut } from "motion";

export const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};
export const itemVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};
export const errorVariants = {
	initial: {
		opacity: 0,
		y: -10,
		height: 0,
	},
	animate: {
		opacity: 1,
		y: 0,
		height: "auto",
	},
	exit: {
		opacity: 0,
		y: -10,
		height: 0,
	},
};

export const buttonVariants = {
	initial: { scale: 1 },
	hover: {
		scale: 1.05,
		backgroundColor: "#0d6e25",
		transition: { stiffness: 400, damping: 10, easeInOut },
	},
	tap: { scale: 0.95 },
};
