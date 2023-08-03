import path from "path";
import fs from "fs/promises";

function ProductDetailPage({ loadedProduct }) {
  // fallback 컨텐츠
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();
  const productone = data.products.find((product) => product.id === productId);

  // dummmy-backend.json 에 없는 path로 요청이 들어온 경우 404 페이지 처리
  if (!productone) {
    return { notFound: true };
  }
  return { props: { loadedProduct: productone } };
}

export async function getStaticPaths() {
  const data = await getData();

  const pathsWithParams = data.products.map((product) => ({
    params: {
      pid: product.id,
    },
  }));

  return {
    paths: pathsWithParams, // /p1 페이지만 빌드타임에 생성
    fallback: true, // 나머지 페이지는 빌드 타임에 생성 x
    // fallback: "blocking", // 나머지 페이지는 fallback상태를 보여주지 않고, SSR처럼 동작
    // fallback: false,
  };
}
export default ProductDetailPage;
