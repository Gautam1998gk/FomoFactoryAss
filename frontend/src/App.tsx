import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom";

import HomeAdmin from "./Pages/admin/Home";
import DashboardLayout from "./Pages/admin/DashboardLayout";



const Rout = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<DashboardLayout/>}>
          <Route index element={<HomeAdmin/>}/>
      </Route>
    </Route>
  )
);




const App = () => {
  return <RouterProvider router={Rout} />;
}; 


export default App;
