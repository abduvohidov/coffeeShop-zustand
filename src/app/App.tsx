import React, {Suspense} from "react";
import {MainLayout} from "./layouts/MainLayout";
import {BrowserRouter} from "react-router";
import {ThemeProvider} from '@gravity-ui/uikit';
import {I18nProvider} from "../shared/providers/translationProvider.tsx";


export const App: React.FC = () => {
  return (
      <div id="app">
          <I18nProvider>
              <BrowserRouter>
                  <ThemeProvider theme="dark">
                      <Suspense fallback={"...Loading"}>
                          <MainLayout />
                      </Suspense>
                  </ThemeProvider>
              </BrowserRouter>
          </I18nProvider>
      </div>
  )
}
