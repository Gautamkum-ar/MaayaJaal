const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4848/api/maaya"
    : "https://maay-jaal-backend.vercel.app/api/maaya";

export default baseUrl;
 