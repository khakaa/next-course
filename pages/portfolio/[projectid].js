import { useRouter } from "next/router";

export default function PortfolioProjectPage() {
  const router = useRouter();

  console.log(router.pathname); // /portfolio/[projectid]
  console.log(router.query); // {projectid: 'something'}
  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}
