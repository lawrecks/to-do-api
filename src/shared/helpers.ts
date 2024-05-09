export const stripKeys = (
  data: Record<string, any>,
  keys: string[],
): Record<string, any> => {
  keys.forEach((key: string) => {
    if (data && data.hasOwnProperty(key)) {
      delete data[key];
    }
  });

  return data;
};

export const successResponse = (statusCode: number, data = {}) => {
  return {
    success: true,
    statusCode,
    data,
  };
};
