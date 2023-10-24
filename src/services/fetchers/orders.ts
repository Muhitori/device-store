export const ordersFetcher = async () => {
	const response = await fetch(`/api/orders`);
	const raw = await response.json();

	return raw?.data;
};
