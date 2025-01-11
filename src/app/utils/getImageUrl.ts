export const getImageUrl = (uuid: string | undefined): string | undefined => {
  if (!uuid) return undefined;
  return `http://menyou-svc-gw.darkube.app/api/v1/documents/${uuid}`;
};
