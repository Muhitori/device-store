export const devicesFetcher = (sellerId?: string) => {
	return async () => {
		const response = await fetch(`/api/devices?sellerId=${sellerId}`);
		const raw = await response.json();

		return raw?.data;
	};
};
