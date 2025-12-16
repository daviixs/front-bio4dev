import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";

export function AdminLayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
