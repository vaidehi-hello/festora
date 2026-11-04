import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

export default function NotFound() {
  useTitle('Page not found');
  return (
    <div className="container-x py-28 text-center">
      <h1 className="text-5xl">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
