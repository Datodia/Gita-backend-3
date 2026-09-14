import { Suspense } from "react";

import { VerifyUserForm } from "@/components/layout/verify-user";

export default function VerifyUser() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Suspense>
        <VerifyUserForm className="w-3/4" />
      </Suspense>
    </div>
  );
}
