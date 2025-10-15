// // app/+not-found.js
// import { Link } from 'expo-router';
// import { StyleSheet, Text, View } from 'react-native';

// export default function NotFoundScreen() {
//   return (
//     View.createElement(View, { style: styles.container },
//       View.createElement(Text, { style: styles.title }, "Page Nahin Mila"),
//       View.createElement(Text, { style: styles.message }, 
//         "Aap jo page dhoond rahe hain woh exist nahi karta"
//       ),
      
//       View.createElement(Link, { href: "/", style: styles.button },
//         View.createElement(Text, { style: styles.buttonText }, "Home Par Wapas Jayein")
//       ),
      
//       View.createElement(Link, { href: "/auth/login", style: styles.button },
//         View.createElement(Text, { style: styles.buttonText }, "Login Karain")
//       )
//     )
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   message: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#666',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
    >
      <View className="flex-1 justify-center items-center min-h-screen px-6 py-10">
        
        {/* Custom Graphic */}
        <View className="items-center mb-10">
          <View className="w-48 h-48 bg-blue-50 rounded-full justify-center items-center mb-6">
            <Feather name="alert-triangle" size={80} color="#0461A6" />
          </View>
        </View>

        {/* Error Code */}
        <Text className="text-6xl font-bold text-gray-800 mb-2">404</Text>
        
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Oops! Page Not Found
        </Text>

        {/* Description */}
        <Text className="text-base text-gray-600 text-center mb-2 leading-6">
          The page you're looking for seems to have wandered off.
        </Text>
        <Text className="text-base text-gray-600 text-center mb-8 leading-6">
          Don't worry, let's get you back on track.
        </Text>

        {/* Debug Info (optional) */}
        {params?.message && (
          <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 w-full max-w-xs">
            <Text className="text-yellow-800 text-sm text-center">
              {params.message}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="w-full max-w-xs space-y-3">
          <TouchableOpacity
            className="bg-[#0461A6] py-4 rounded-lg flex-row justify-center items-center"
            onPress={() => router.replace('/pages/home')}
          >
            <Feather name="home" size={20} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">
              Go to Homepage
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-300 py-4 rounded-lg flex-row justify-center items-center"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#374151" />
            <Text className="text-gray-700 font-medium text-lg ml-2">
              Go Back
            </Text>
          </TouchableOpacity>

          {/* Additional Help Option */}
          <TouchableOpacity
            className="py-4 rounded-lg flex-row justify-center items-center"
            onPress={() => router.push('/contact')}
          >
            <Feather name="help-circle" size={20} color="#0461A6" />
            <Text className="text-[#0461A6] font-medium text-lg ml-2">
              Get Help
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Links */}
        <View className="mt-12">
          <Text className="text-gray-500 text-sm mb-4 text-center">
            Popular Pages
          </Text>
          <View className="flex-row flex-wrap justify-center gap-3">
            <TouchableOpacity onPress={() => router.push('/Pages/Home')}>
              <Text className="text-[#0461A6] font-medium">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text className="text-[#0461A6] font-medium">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text className="text-[#0461A6] font-medium">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/about')}>
              <Text className="text-[#0461A6] font-medium">About</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}