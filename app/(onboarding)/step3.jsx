
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, View } from 'react-native';
import Logo from "../../assets/Icon/Logo.svg";
import Visualize from "../../assets/images/step3.jpg";
import Button from '../../components/ui/Button';
const Step3 = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={Visualize} 
        className="flex-1"
        resizeMode="cover"
      >
<View className="flex flex-row  mt-28 justify-center">
                <Logo />
</View>
        <LinearGradient
          colors={[
            '#000000',
            '#000000', 
            'rgba(0, 0, 0, 0.6)',
            'rgba(255, 255, 255, 0)'
          ]}

          locations={[0, 0.2586, 0.6282, 0.9995]}
          className="w-full"
          style={{
            
            height: 500,
            position: 'absolute',
            top: 364,
            transform: [{ rotate: '180.06deg' }]
          }}
        />
        
        {/* Content Container */}
        <View className="flex-1 justify-end pb-10 px-6">
   

          {/* Main Title */}
          <Text className="text-white text-4xl text-center font-bold mb-6">
Transform your vision{'\n'} into reality </Text>

          {/* Description */}
          <Text className="text-[#F5F6FA] text-base text-center font-normal mb-8 leading-6">
Turn your ideas into beautifully designed{'\n'}  spaces with the power of AI. Whether it's your{'\n'}   room or your home’s exterior & Interior</Text>

<View className="w-full pb-8 flex-row justify-center gap-2">
  <View className="w-[20px] h-1 bg-[#FFFFFF33] rounded-full"></View>
  <View className="w-[20px] h-1 bg-[#FFFFFF33] rounded-full"></View>
  <View className="w-[30px] h-1 bg-[#0461A6] rounded-full"></View>



</View>
          <Button variant="primary" className="py-4">
            Next
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Step3;