import axios from "axios";

export const useSearch =
  ({ code, search, setRestaurants }) =>
  async (e) => {
    e.preventDefault();
    const baseURL = process.env.REACT_APP_BASE_URL;
    const result = await axios({
      method: "get",
      url: `${baseURL}/restaurant/`,
      params: {
        category: code ?? "",
        search: search ?? "",
        limit: 999,
      },
    });
    e.target[0].value = "";
    setRestaurants([...result.data.results]);
  };
