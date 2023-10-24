export const lotsFetcher = (sellerId?: string) => {
	return async () => {
		const response = await fetch(`/api/lots?sellerId=${sellerId}`);
		const raw = await response.json();

		return raw?.data;
	};
};
