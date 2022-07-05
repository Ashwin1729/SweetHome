import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "a0482efaddmsh96008daf6627c99p1bfb1bjsn897fc89565d1",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data;
};
