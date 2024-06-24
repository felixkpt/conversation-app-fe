// Define types for error objects
type FastAPIError = { loc: string[]; msg: string };
type LaravelError = any;

// Define type for the formatErrors function
type FormatErrorsFunction = {
    fastAPI: (errors: FastAPIError[]) => Record<string, string>;
    laravel: (errors: LaravelError) => Record<string, string>;
};

// Helper function to format errors in a uniform structure
export const formatErrors: FormatErrorsFunction = {
    fastAPI: (errors) => {
        const formattedErrors: Record<string, string> = {};

        errors.forEach((error) => {
            const { loc, msg } = error;
            const field = loc[1];
            formattedErrors[field] = msg;
        });

        return formattedErrors;
    },
    laravel: (errors) => {
        // Placeholder for formatting Laravel errors
        // We will Implement formatting logic here
        return {};
    },
};
