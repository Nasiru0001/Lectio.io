// app/components/CTAButton.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getRoleRedirect } from "@/app/lib/getRoleRedirect";
import Link from "next/link";

export default async function CTA() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  if (authenticated) {
    const user = await getUser();
    const redirectPath = await getRoleRedirect(user?.id ?? "");
    return (
      <section className="py-20 px-6 bg-[#00a3a4] text-white text-center my-12">
        <h2 className="md:text-4xl text-4xl font-bold uppercase mb-6">
          Turn Data Into Strategic Decisions
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Stop viewing raw tables. Start understanding trends, performance, and
          growth.
        </p>

        <Link
          href={redirectPath}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Access Dashboard
        </Link>
      </section>
    );
  }

  // Not logged in — show Sign Up + Sign In
  return (
    <section className="py-20 px-6 bg-[#00a3a4] text-white text-center my-12">
      <h2 className="md:text-4xl text-4xl font-bold uppercase mb-6">
        Turn Data Into Strategic Decisions
      </h2>
      <p className="mb-8 text-lg opacity-90">
        Stop viewing raw tables. Start understanding trends, performance, and
        growth.
      </p>
      <RegisterLink className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
        Get Started Free
      </RegisterLink>
      <LoginLink className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
        Sign In
      </LoginLink>
    </section>
  );

  // return (
  //   <section className="py-20 px-6 bg-[#00a3a4] text-white text-center my-12">
  //     <h2 className="md:text-4xl text-4xl font-bold uppercase mb-6">
  //       Turn Data Into Strategic Decisions
  //     </h2>
  //     <p className="mb-8 text-lg opacity-90">
  //       Stop viewing raw tables. Start understanding trends, performance, and
  //       growth.
  //     </p>

  //     <Link
  //       href="/api/auth/login"
  //       className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
  //     >
  //       Access Dashboard
  //     </Link>
  //   </section>
  // );
}
