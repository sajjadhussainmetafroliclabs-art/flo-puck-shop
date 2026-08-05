import { FloProvider, useFlo, type Params, type ScreenName } from "@/lib/flo-app";
import { BottomNav } from "./ui";
import { LoginScreen, SignupScreen, SplashScreen, WelcomeScreen } from "./screens-onboarding";
import {
  CategoriesScreen,
  CategoryScreen,
  HomeScreen,
  ListingScreen,
  NewArrivalsScreen,
  ResultsScreen,
  SaleScreen,
  SearchScreen,
} from "./screens-shop";
import { AddedModal, GalleryScreen, ProductScreen, ReviewsScreen } from "./screens-product";
import {
  AddressScreen,
  CartScreen,
  DeliveryScreen,
  PaymentScreen,
  ReviewScreen,
  SuccessScreen,
  WishlistScreen,
} from "./screens-checkout";
import {
  AddressesScreen,
  NotificationsScreen,
  OrdersScreen,
  PaymentsScreen,
  ProfileScreen,
  SettingsScreen,
} from "./screens-profile";

const NO_NAV = [
  "splash",
  "welcome",
  "login",
  "signup",
  "gallery",
  "address",
  "delivery",
  "payment",
  "review",
  "success",
  "product",
];

function Router() {
  const { screen } = useFlo();
  const map: Record<string, React.ReactNode> = {
    splash: <SplashScreen />,
    welcome: <WelcomeScreen />,
    login: <LoginScreen />,
    signup: <SignupScreen />,
    home: <HomeScreen />,
    categories: <CategoriesScreen />,
    category: <CategoryScreen />,
    search: <SearchScreen />,
    results: <ResultsScreen />,
    sale: <SaleScreen />,
    new: <NewArrivalsScreen />,
    listing: <ListingScreen />,
    product: <ProductScreen />,
    gallery: <GalleryScreen />,
    reviews: <ReviewsScreen />,
    cart: <CartScreen />,
    wishlist: <WishlistScreen />,
    address: <AddressScreen />,
    delivery: <DeliveryScreen />,
    payment: <PaymentScreen />,
    review: <ReviewScreen />,
    success: <SuccessScreen />,
    profile: <ProfileScreen />,
    orders: <OrdersScreen />,
    addresses: <AddressesScreen />,
    payments: <PaymentsScreen />,
    notifications: <NotificationsScreen />,
    settings: <SettingsScreen />,
  };

  return (
    <>
      <div key={screen} className="h-full">
        {map[screen]}
      </div>
      {!NO_NAV.includes(screen) && <BottomNav />}
      <AddedModal />
    </>
  );
}

export function FloApp({
  initialScreen,
  initialParams,
  frozen,
}: {
  initialScreen?: ScreenName;
  initialParams?: Params;
  frozen?: boolean;
} = {}) {
  return (
    <FloProvider
      {...(initialScreen ? { initialScreen } : {})}
      {...(initialParams ? { initialParams } : {})}
      {...(frozen ? { frozen } : {})}
    >
      <div className="relative h-full w-full overflow-hidden bg-background">
        <Router />
      </div>
    </FloProvider>
  );
}
