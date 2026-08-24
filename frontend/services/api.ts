export async function fetchPortfolioData() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  const response = await fetch(`${API_BASE_URL}/api/portfolio/holdings`);

  if (!response.ok) {
    throw new Error("Failed to fetch portfolio data");
  }
  return response.json();
}
