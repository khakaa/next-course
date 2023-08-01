import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  console.log(router.query); // {id: 'client1'}
  return (
    <div>
      <h1>The Projects of a Given Client</h1>
    </div>
  );
}
