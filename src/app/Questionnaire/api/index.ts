type Payload = {
  responses: { id: number; response: { [key: string]: string | number } | null }[];
  userInputs: { [key: string]: string };
};

const handleSubmit = async (payload: Payload) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    console.log('Submitted successfully:', payload);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

export default handleSubmit;
