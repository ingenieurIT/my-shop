export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export function successResponse<T>(
    data: T,
    message = "Succès"
): ApiResponse<T> {
    return {
        success: true,
        message,
        data,
    };
}

export function errorResponse(
    message = "Une erreur est survenue"
): ApiResponse<null> {
    return {
        success: false,
        message,
    };
}