import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx'
import { AppProvider } from "@/context/AppContext.tsx";
import {Provider} from "@/components/ui/provider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProvider>
          <Provider defaultTheme={"light"}>
              <App />
          </Provider>
      </AppProvider>
  </StrictMode>,
)
