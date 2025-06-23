export const config = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  
  // Leonardo AI configuration
  leonardo: {
    useMockData: process.env.NODE_ENV === "development" || !process.env.LEONARDO_API_KEY,
    mockGenerationId: "78ccc2de-da6c-4cef-bad1-b081704f2857",
    mockImageUrl: "https://picsum.photos/512/512",
  },
  
  // Database configuration
  database: {
    skipCreditsCheck: process.env.NODE_ENV === "development",
    useMockData: process.env.NODE_ENV === "development",
  },
} as const; 