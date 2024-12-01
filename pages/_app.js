
import Header from "@/components/Header";
import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {

  const [asideOpen, setAsideOpen] = useState(false);

  const asideClickOpen = () => {
    setAsideOpen(!asideOpen);
  }

  return <>
    <ParentComponent appOpen={asideOpen} appAsideOpen={asideClickOpen} />
    <main>
      <div className={asideOpen ? "container" : "container active"}>
        <Component {...pageProps} />
      </div>
    </main>
  </>
}
