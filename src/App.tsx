import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-black dark:text-white dark:bg-black">
      <Layout />

      <main className="lg:ml-14 p-6">
        <Outlet />
      </main>
    </main>
  );
}
