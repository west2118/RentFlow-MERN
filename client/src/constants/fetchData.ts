import axios from "axios";

export const fetchData =
  (url: string, withParams = false) =>
    async ({ queryKey }: { queryKey: any }) => {
      const [_key, param] = queryKey;
      const finalUrl = withParams ? `${url}/${param}` : url;

      const res = await axios.get(finalUrl);

      return res.data;
    };
