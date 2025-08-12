// import axios from "axios";
// import { useEffect, useState } from "react";

// const useFetchData = <T extends Record<string, any>>(
//   url: string | null,
//   token: string | null,
//   deps: any[] = []
// ) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!url || !token) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     const controller = new AbortController();

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           signal: controller.signal,
//         });

//         setData(response?.data);
//         setError(null);
//       } catch (error: any) {
//         if (error.name !== "AbortError") {
//           const errorMessage =
//             error?.response?.data?.message ||
//             error?.message ||
//             "An unexpected error occurred";
//           setError(errorMessage);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     return () => {
//       controller.abort();
//     };
//   }, [token, url, ...deps]);

//   return { data, loading, error };
// };

// export default useFetchData;
