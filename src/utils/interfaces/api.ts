export interface ApiResponse<T> {
    wasSuccessful: boolean;
    result: T | undefined;
}
