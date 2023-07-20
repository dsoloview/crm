import {RouterProvider} from "react-router-dom";
import router from "./router/router.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <Provider store={store}>
        <main className="main">
            <RouterProvider router={router} />
        </main>
        <ToastContainer />
    </Provider>
  )
}

export default App
