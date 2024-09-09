
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import CounterContextProvider from "/src/component/counterCountext/counterContext.jsx";
import Authcontext from "./component/Authcontext/Authcontext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
<CounterContextProvider >
    <Authcontext>
<App/>
    </Authcontext>
</CounterContextProvider>
)
