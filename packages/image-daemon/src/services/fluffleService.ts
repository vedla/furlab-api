import axios from 'axios';
import FormData from 'form-data';

export const searchFluffle = async (imageBuffer: Buffer, includeNsfw: boolean) => {
  const formData = new FormData();
  formData.append('file', imageBuffer, { filename: 'image.png', contentType: 'image/png' });
  formData.append('includeNsfw', includeNsfw ? 'true' : 'false');

  formData.append('platforms[]', 'Fur Affinity');
  formData.append('platforms[]', 'Twitter');
  formData.append('platforms[]', 'e621');
  formData.append('platforms[]', 'Weasyl');
  formData.append('platforms[]', 'Furry Network');
  formData.append('platforms[]', 'DeviantArt');
  formData.append('platforms[]', 'Inkbunny');

  formData.append('limit', '8');

  const headers = {
    'User-Agent': 'FurlabDaemon/1.0 (by Tay Fox on GitHub)',
    ...formData.getHeaders(),
  };

  try {
    const response = await axios.post('https://api.fluffle.xyz/v1/search', formData, { headers });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error calling Fluffle API:', error.message);
      console.error(error);
    } else {
      console.error('Error calling Fluffle API:', error);
    }
    throw error;
  }
};
