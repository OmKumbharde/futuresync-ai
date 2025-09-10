import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";
import { CLERK_PUBLISHABLE_KEY } from "./lib/clerk";

// Only render with Clerk if we have a valid key
if (CLERK_PUBLISHABLE_KEY) {
  createRoot(document.getElementById("root")!).render(
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "hsl(258 84% 65%)",
          colorBackground: "hsl(220 13% 8%)",
          colorInputBackground: "hsl(220 13% 14%)",
          colorText: "hsl(220 6% 97%)",
        }
      }}
    >
      <App />
    </ClerkProvider>
  );
} else {
  // Render without Clerk for demo purposes
  createRoot(document.getElementById("root")!).render(<App />);
}
