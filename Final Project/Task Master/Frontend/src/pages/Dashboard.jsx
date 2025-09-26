import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
