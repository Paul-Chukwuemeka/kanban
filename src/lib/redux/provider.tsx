"use client";

import { Provider } from "react-redux";
import store from "./store";
import { StoreHydration } from "../../components/features/store-hydration";

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreHydration />
      {children}
    </Provider>
  );
}
