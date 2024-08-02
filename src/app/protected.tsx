import React, { useEffect } from "react";
import { redirect } from "next/navigation";


export default function ProtectedRoute(Component: any) {
    return function IsAuth(props: any) {
        const auth = localStorage.getItem('access-token');


        useEffect(() => {
            if (!auth) {
                return redirect("/");
            }
        }, []);


        if (!auth) {
            return null;
        }

        return <Component {...props} />
    };
}