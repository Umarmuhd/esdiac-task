import useSWR from "swr";
import fetcher from "../../utils/fetcher";

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data?.data,
    isLoading: !data && !error,
    isError: error,
  };
};
