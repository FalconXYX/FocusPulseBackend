// Helper functions.

/** Returns a 200 with an optional given message. */
export const okReturn = (message = 'Success'): { statusCode: number; body: string } => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message,
    }),
  };
};

/** Returns */
