import { useRouter } from "next/router";

export default function BlogPostsPage() {
  const router = useRouter();

  console.log(router.query); // { slug: Array(2) ['2023', '08']}

  return (
    <div>
      <h1>The Blog BlogPostsPage</h1>
    </div>
  );
}
