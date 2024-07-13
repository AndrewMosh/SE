import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { store } from "./store/store.tsx";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>
);
