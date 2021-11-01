export const parseResponse  = (data: any) => {
  if (data.status === 'error') throw new Error('Something went wrong')
  return {
    data: data.message
  }
};
