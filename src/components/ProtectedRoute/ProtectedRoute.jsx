import { Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn = false, element }) {
  return loggedIn ? element : <Navigate to="/" />;
}

export default ProtectedRoute;
