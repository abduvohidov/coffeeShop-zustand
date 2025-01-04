import React, {Suspense} from "react";
import {MainLayout} from "./layouts/MainLayout";
import {BrowserRouter} from "react-router";
import {ThemeProvider} from '@gravity-ui/uikit';


export const App: React.FC = () => {

  return (
      <div id="app">
          <BrowserRouter>
              <ThemeProvider theme="dark">
                  <Suspense fallback={"...Loading"}>
                      <MainLayout />
                  </Suspense>
              </ThemeProvider>
          </BrowserRouter>
      </div>
  )
}
