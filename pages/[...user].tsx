import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();

  const { user } = useAuth();
  if (!user) {
    router.push("/login");
  }

  return <div>user</div>;
}
