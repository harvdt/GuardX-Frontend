export type ApiResponse<T = unknown> = {
	data: T;
	statusCode: number;
	message: string;
};
