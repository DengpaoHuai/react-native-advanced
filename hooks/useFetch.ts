import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    waitFor(3000).then(() => {
      apiClient
        .get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [refresh]);

  return {
    data,
    loading,
    error,
    refetch: () => setRefresh(!refresh),
  };
};

export default useFetch;
