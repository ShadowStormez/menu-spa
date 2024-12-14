export const getImageUrl = (uuid: string): string => {
    const baseUrl = 'https://yourdomain.com/documents/';
    return `${baseUrl}${uuid}`;
  };
  