import axios from "axios";
import { useCallback, useEffect } from "react";

export const useGetData = ({ number, code, setRestaurants, setCount }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  // 데이터 받아오기
  const getItems = useCallback(async () => {
    const result = await axios({
      method: "get",
      url: `${baseURL}/restaurant/`,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        category: code ?? "",
        limit: 10,
        offset: number,
      },
    });
    setRestaurants((prevState) => [...prevState, ...result.data.results]);
    setCount(result.data.count);
  }, [number]);

  useEffect(() => {
    getItems();
  }, [getItems]);
};
