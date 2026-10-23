import { createContext, useContext, useRef } from "react";
import { useLocation } from "react-router";

const NavigationContext = createContext({
  isRouteChange: false,
});

export function NavigationProvider({ children }) {
  const location = useLocation();
  const initialKeyRef = useRef(location.key);
  const hasNavigatedRef = useRef(false);

  // When location.key changes away from the initial key, a client-side navigation occurred
  if (location.key !== initialKeyRef.current) {
    hasNavigatedRef.current = true;
  }

  const isRouteChange = hasNavigatedRef.current;

  return (
    <NavigationContext.Provider value={{ isRouteChange }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationStatus() {
  return useContext(NavigationContext);
}
