// Standalone stub -- no ICP SDK required.
// This allows the app to run locally with just `npm run dev` without dfx.
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  createElement,
  useContext,
  useMemo,
} from "react";

export type Status =
  | "initializing"
  | "idle"
  | "logging-in"
  | "success"
  | "loginError";

export type InternetIdentityContext = {
  identity?: undefined;
  login: () => void;
  clear: () => void;
  loginStatus: Status;
  isInitializing: boolean;
  isLoginIdle: boolean;
  isLoggingIn: boolean;
  isLoginSuccess: boolean;
  isLoginError: boolean;
  loginError?: Error;
};

type ProviderValue = InternetIdentityContext;
const InternetIdentityReactContext = createContext<ProviderValue | undefined>(
  undefined,
);

export const useInternetIdentity = (): InternetIdentityContext => {
  const context = useContext(InternetIdentityReactContext);
  if (!context) {
    throw new Error(
      "InternetIdentityProvider is not present. Wrap your component tree with it.",
    );
  }
  return context;
};

export function InternetIdentityProvider({
  children,
}: PropsWithChildren<{ children: ReactNode; createOptions?: unknown }>) {
  const value = useMemo<ProviderValue>(
    () => ({
      identity: undefined,
      login: () => {},
      clear: () => {},
      loginStatus: "idle",
      isInitializing: false,
      isLoginIdle: true,
      isLoggingIn: false,
      isLoginSuccess: false,
      isLoginError: false,
      loginError: undefined,
    }),
    [],
  );

  return createElement(InternetIdentityReactContext.Provider, {
    value,
    children,
  });
}
