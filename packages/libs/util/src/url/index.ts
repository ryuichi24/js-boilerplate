/**
 * Build URL Queries
 * @param data
 * @returns the raw query components
 * for the details of what "Query Component" is @see https://www.rfc-editor.org/rfc/rfc3986#section-3.4
 */
export function makeURLQueries(data: Record<string, string>) {
  return {
    toString: () => new URLSearchParams(data),
    appendTo: (rawSearch: string) => {
      const searchParams = new URLSearchParams(rawSearch);
      Object.entries(data).forEach(([key, value]) => {
        searchParams.set(key, value);
      });
      return searchParams;
    },
  };
}
