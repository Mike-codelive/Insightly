import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:text-white dark:bg-black">

      <Navbar />

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
