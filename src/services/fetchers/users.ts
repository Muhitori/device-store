export const usersFetcher = async () => {
	const response = await fetch(`/api/users`);
	const raw = await response.json();

	return raw?.data;
};
