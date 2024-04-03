import { cookies } from "next/headers";
import Login from "./login/page";
import Home from "./home/page";

export default function Page() {
  

  if(cookies().get("token") !== undefined)
      return <Home />
  
  return <Login />
}