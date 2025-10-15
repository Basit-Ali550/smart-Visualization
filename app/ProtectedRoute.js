import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0461A6" />
      </View>
    );
  }

  return children;
};

export default ProtectedRoute;