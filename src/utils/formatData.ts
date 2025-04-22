export function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDay()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
