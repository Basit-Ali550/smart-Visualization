import InputField from "@/components/ui/InputFeild"; // make sure the path is correct
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

// Yup validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
});

const App = () => {
  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Formik
        initialValues={{ username: "", password: "", price: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
        }}
      >
        {({ handleSubmit }) => (
          <View>
            {/* Username */}
            <InputField
              label="Username"
              name="username"
              placeholder="Enter your username"
              leftIcon={Feather}
              leftIconName="user"
              required
            />

            {/* Password */}
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              leftIcon={Feather}
              leftIconName="lock"
              required
            />

            {/* Price */}
            <InputField
              label="Price"
              name="price"
              type="number"
              placeholder="Enter price"
              leftIcon={MaterialIcons}
              leftIconName="attach-money"
              required
            />

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-4 p-3 bg-blue-500 rounded-lg"
            >
              <Text className="text-white text-center font-medium">Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default App;
