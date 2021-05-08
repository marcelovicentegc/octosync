export function removeDuplicates(arr: string[]) {
  return [...new Set(arr)];
}

export function handleAxiosError(error: any) {
  if (error.response) {
    console.log("Request made and server responded\n");
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(
      "The request was made but no response was received: ",
      error.request
    );
  } else {
    console.log(
      "Something happened in setting up the request that triggered an Error: ",
      error.message
    );
  }
}
