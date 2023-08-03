import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // 전체 프로젝트 디렉토리에서 시작하여 data/dummy-backend.json 경로 지정해줌
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // getStaticProps option
  // 1.redirect
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  // 2. 404 페이지
  if (data.products.length === 0) {
    return { noFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
