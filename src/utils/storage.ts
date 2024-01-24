export const storage =
  typeof window !== 'undefined'
    ? localStorage
    : {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
      };
