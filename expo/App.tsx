
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeliveryForm from './components/DeliveryForm';
import HomePage from './pages/HomePage';
import { StateProvider } from './state/context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';
import ParcelLists from './pages/ParcelListPage';
import Parcel from './components/ParcelItem';

enableScreens();

export type RootStackParamList = {
  Home: undefined;
  DeliveryForm: undefined;
  Parcel: {
    parcelId?: number;
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});
const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} />
            {/* <Stack.Screen name="Parcel" component={Parcel} /> */}
            <Stack.Screen name="DeliveryForm" component={DeliveryForm} />
            <Stack.Screen name="ParcelList" component={ParcelLists} />
          </Stack.Navigator>
        </NavigationContainer>
      </StateProvider>
    </QueryClientProvider>
  );
};

export default App;

