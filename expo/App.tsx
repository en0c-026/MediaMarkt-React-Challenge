
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeliveryForm from './components/DeliveryForm';
import Package from './components/Package';
import HomePage from './pages/HomePage';
import { StateProvider } from './state/context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';

enableScreens();

export type RootStackParamList = {
  Home: undefined;
  DeliveryForm: undefined;
  Package: {
    packageId?: number;
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
            <Stack.Screen name="Package" component={Package} />
            <Stack.Screen name="DeliveryForm" component={DeliveryForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </StateProvider>
    </QueryClientProvider>
  );
};

export default App;

