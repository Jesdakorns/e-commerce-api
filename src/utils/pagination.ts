export function convertSkipPaginate({ limit, page }) {
  const skip = (+page - 1) * limit;
  return skip;
}
