const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://lms.hadielearning.com"
    : "http://localhost:3000";

export default baseUrl;
