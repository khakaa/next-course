import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  // const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState();

  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    "https://nextjs-course-b6043-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    const transformedData = [];
    for (const key in data) {
      transformedData.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    setSales(transformedData);
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://nextjs-course-b6043-default-rtdb.firebaseio.com/sales.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedData = [];

  //       for (const key in data) {
  //         transformedData.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedData);
  //       setLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}
