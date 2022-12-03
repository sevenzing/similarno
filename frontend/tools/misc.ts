export const cleanString = (value: string) => value.toLowerCase().trim();


export const postRequest = async (url: string, data: object) => {
    const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return rawResponse;
}