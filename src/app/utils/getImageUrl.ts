export const getImageUrl = (uuid: string): string => {
  return `http://menyou-svc-gw.darkube.app/api/v1/documents/${uuid}`;
};
