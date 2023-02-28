import Layout from "@/components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import { ProjectProvider } from "@/hooks/useProjectUtility";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProjectProvider>
    </AuthProvider>
  );
}
