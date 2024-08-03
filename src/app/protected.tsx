"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

export default function ProtectedRoute(Component: any) {
  return function IsAuth(props: any) {
    let auth = "";
    if (typeof window !== "undefined") {
      auth = window.localStorage.getItem("access-token") || "";
    }
    //const auth = localStorage.getItem('access-token');

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
