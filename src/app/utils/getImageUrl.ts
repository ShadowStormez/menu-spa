export const getImageUrl = (uuid: string | undefined): string => {
  if (!uuid) return ""; // Return empty string instead of undefined
  return `https://menyou-svc-gw.darkube.app/api/v1/documents/${uuid}`;
};
