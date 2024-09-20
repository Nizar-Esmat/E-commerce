
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import CounterContextProvider from "/src/component/counterCountext/counterContext.jsx";
import Authcontext from "./component/Authcontext/Authcontext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const queryClient = new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:false}}})

createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
<CounterContextProvider >
    <Authcontext>
        <ToastContainer autoClose={600}></ToastContainer>
        <ReactQueryDevtools initialIsOpen={false} />
<App/>
    </Authcontext>
</CounterContextProvider>
    </QueryClientProvider>
)
