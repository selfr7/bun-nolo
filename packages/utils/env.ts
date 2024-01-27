export const isBrowser = typeof window !== "undefined";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

export const isRNEnvironment = () => {
  const globalObj = typeof global !== "undefined" ? global : window;
  return globalObj && globalObj._ISRN_ === true;
};
