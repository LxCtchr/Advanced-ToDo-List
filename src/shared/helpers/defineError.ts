export const defineError = (error: unknown) => {
  return typeof error === "object" && error !== null && error !== undefined && "originalStatus" in error;
};
