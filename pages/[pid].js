import path from "path";
import fs from "fs/promises";

function ProductDetailPage({ loadedProduct }) {
  // fallback 컨텐츠
  //   if (!loadedProduct) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;
  console.log(productId);
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const productone = data.products.find((product) => product.id === productId);

  return { props: { loadedProduct: productone } };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }], // /p1 페이지만 빌드타임에 생성
    // fallback: true, // 나머지 페이지는 빌드 타임에 생성 x
    fallback: "blocking", // 나머지 페이지는 fallback상태를 보여주지 않고, SSR처럼 동작
    // fallback: false,
  };
}
export default ProductDetailPage;
