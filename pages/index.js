import { useSession } from "next-auth/react";
import Session from "@/components/Session";
import { useRouter } from "next/router";

export default function MainPage() {

  const {data: session, status} = useSession();
  const router = useRouter();

  console.log(session)
  console.log(status)
  if (!session ||  status === 'unauthenticated') {
    return <Session />;
  }

  if (session && status === 'authenticated') {
    router.push('/home')
  }

  // return (
  //   <div>
  //     <Header />
  //     <Featured product={featuredProduct} />
  //     <NewProducts products={newProducts} favids={favIds} />
  //     <Footer />
  //   </div>
  // );
}

