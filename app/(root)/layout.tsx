import { auth } from "@/auth";
import Header from "@/components/Header";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-[#16191E] px-5 md:px-16">
      <div className="mx-auto max-w-7xl relative">
        <Image
          src="/images/pattern.webp"
          alt="Background pattern"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10"
        />
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
