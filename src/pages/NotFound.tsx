import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-lg text-gray-500">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
}
