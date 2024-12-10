.refine(
  (data) => {
    if (data.NODE_ENV === 'production') return Boolean(data.PLAUSIBLE_SCRIPT_URL);
    return true;
  },
  {
    message: 'PLAUSIBLE_SCRIPT_URL is required in production',
    path: ['PLAUSIBLE_SCRIPT_URL'],
  }
);