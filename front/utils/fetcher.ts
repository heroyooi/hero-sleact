import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);

const fetcherPost = (url: string) =>
  axios
    .post(
      url,
      {},
      {
        withCredentials: true,
      },
    )
    .then((response) => response.data);

export default fetcher;
