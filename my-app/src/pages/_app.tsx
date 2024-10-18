import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import dynamic from "next/dynamic";
import { ProductProvider } from "@/utils/context"; // Adjust the import path as needed

export default function App({ Component, pageProps }: AppProps) {
  const ReactQueryDevtools = dynamic(
    () => import("react-query/devtools").then((mod) => mod.ReactQueryDevtools),
    { ssr: false }
  );
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </ProductProvider>
    </QueryClientProvider>
  );
}
