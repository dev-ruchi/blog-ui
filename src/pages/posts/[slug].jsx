import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <p>Post: {router.query.slug}</p>
      <Link href="/postcreate">Create a New Post</Link>
    </div>
  );
}
