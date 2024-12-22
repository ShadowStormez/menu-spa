export const getImageUrl = (uuid: string | undefined): string => {
    const baseUrl = 'http://yourdomain.com/documents/';
    return `${baseUrl}${uuid}`;
  };
  