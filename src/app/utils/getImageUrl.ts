export const getImageUrl = (uuid: string): string => {
    const baseUrl = 'http://yourdomain.com/documents/';
    return `${baseUrl}${uuid}`;
  };
  