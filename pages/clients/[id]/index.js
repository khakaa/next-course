import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  console.log(router.query); // {id: 'client1'}

  function loadProjectHandler() {
    //load data...
    // router.push("/clients/max/projecta");
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
