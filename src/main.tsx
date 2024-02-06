import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from "react-router-dom";
import { TourProvider } from '@reactour/tour'
import { steps } from "./help-tour-steps.ts";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";


const disableBody = (target: Element | null) => {
  disableBodyScroll(target!)
}
const enableBody = (target: Element | null) => {
  enableBodyScroll(target!)
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/leseteppich">
      <TourProvider steps={steps}
                    afterOpen={disableBody}
                    beforeClose={enableBody}
                    showBadge={false}
                    startAt={0}>
        <App/>
      </TourProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
