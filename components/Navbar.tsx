// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   LoginLink,
//   LogoutLink,
//   RegisterLink,
// } from "@kinde-oss/kinde-auth-nextjs";

// export default function Navbar() {
//   // Default to null user (unauthenticated)
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     async function fetchSession() {
//       try {
//         const res = await fetch("/api/auth/session");
//         const data = await res.json();
//         if (data?.user) setUser(data.user);
//       } catch (err) {
//         console.error("Failed to fetch session:", err);
//         // Keep user as null (unauthenticated)
//       }
//     }
//     fetchSession();
//   }, []);

//   return (
//     <nav className="pt-4 flex justify-between items-center container mx-auto">
//       <h1 className="text-2xl text-white font-bold">LECTIO.IO</h1>
//       <div>
//         {user ? (
//           <LogoutLink>
//             <button className="cursor-pointer">Logout</button>
//           </LogoutLink>
//         ) : (
//           <div className="space-x-2">
//             <LoginLink>
//               <button>Sign in</button>
//             </LoginLink>
//             <RegisterLink>
//               <button>Sign up</button>
//             </RegisterLink>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

import React from "react";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  const isAuthed = await isAuthenticated();

  return (
    <nav className=" pt-4 flex justify-between items-center container mx-auto">
      <div className=" flex justify-center items-center gap-5">
        <Image
          src="/Lectico logo.svg"
          alt="Lectico.io logo"
          width={30}
          height={20}
        />{" "}
        <h1 className="text-2xl text-white font-bold flex justify-center items-center -mt-1">
          {" "}
          LECTIO.IO
        </h1>
      </div>

      <div>
        {isAuthed ? (
          <LogoutLink>
            <button className="cursor-pointer">Logout</button>
          </LogoutLink>
        ) : (
          <div className="space-x-5">
            <LoginLink>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-xl">
                Sign in
              </button>
            </LoginLink>

            <RegisterLink>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-xl">
                Sign up
              </button>
            </RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
}
