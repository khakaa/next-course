import { useEffect, useState } from "react";

export default function LastSalesPage(props) {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState();

  useEffect(() => {
    setLoading(true);
    fetch("https://nextjs-course-b6043-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = [];

        for (const key in data) {
          transformedData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales?.map((sale) => (
        <li key={sale.key}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}
