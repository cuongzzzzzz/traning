import type { MetaFunction } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return redirect("/books")
}

export default function Index() {
  return (<></>)
}

