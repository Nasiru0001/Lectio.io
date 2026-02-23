import React from "react";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();

  return (
    <nav className=" mx-auto pt-4 flex justify-between items-center">
      <h1 className="text-2xl text-white font-bold">LECTIO.IO</h1>
      <div>
        {isAuthed ? (
          <LogoutLink>
            <button className="cursor-pointer">Logout</button>
          </LogoutLink>
        ) : (
          <div>
            <LoginLink>
              <button>Sign in</button>
            </LoginLink>

            <RegisterLink>
              <button>Sign up</button>
            </RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
}
