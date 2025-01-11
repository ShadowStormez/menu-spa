export const getImageUrl = (uuid: string | undefined): string => {
    const baseUrl = 'http://menyou-svc-gw.darkube.app/api/v1/documents/';
    return `${baseUrl}${uuid}`;
  };
  