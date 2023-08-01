import Link from "next/link";

export default function ClientPage() {
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        <li>
          <Link href="/clients/max">Maximilian</Link>
        </li>
        <li>
          <Link href="/clients/menu">Meneul</Link>
        </li>
      </ul>
    </div>
  );
}
