// defining the base url for every page
export const getBaseUrl = () => {
    return process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
}