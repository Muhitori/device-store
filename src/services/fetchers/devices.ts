export const devicesFetcher = (customerId?: string) => {
	return async () => {
		const response = await fetch(`/api/offer?customerId=${customerId}`);
		const raw = await response.json();

		return raw?.data;
	};
};
