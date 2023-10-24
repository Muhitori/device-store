export const offersFetcher = (customerId?: string | number) => {
	return async () => {
		const response = await fetch(`/api/offers?customerId=${customerId}`);
		const raw = await response.json();

		return raw?.data;
	};
};
