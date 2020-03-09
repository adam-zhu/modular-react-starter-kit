export const mockService = (mockData, latencyMs) => {
  const networkLatency = latencyMs || Math.random() * 1000;

  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() < 0.05 ? reject("Mock error message") : resolve(mockData),
      networkLatency
    )
  );
};
