/** next */
import type { AppProps } from "next/app";

/** styles */
import "@/styles/globals.scss";
////////////////////////////////////////////////////////////////////////////////

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
