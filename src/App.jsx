import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteLayout from "./site/layout";
import DashboardLayout from "./dashboard/layout";
import Home from "./site/pages/Home";
import Services from "./site/pages/Services";
import Dashboard from "./dashboard/pages/Dashboard";
import DashboardServices from "./dashboard/pages/Services";
import Banners from "./dashboard/pages/Banners";
import Categories from "./dashboard/pages/Categories";
import SubCategories from "./dashboard/pages/SubCategories";
import Coupons from "./dashboard/pages/Coupons";
import Medias from "./dashboard/pages/Medias";
import AssignCustomers from "./dashboard/pages/AssignCustomers";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* SITE ROUTES */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
        </Route>

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="assign-customers" element={<AssignCustomers />} />
          <Route path="banners" element={<Banners />} />
          <Route path="categories" element={<Categories />} />  
           <Route path="sub_categories" element={<SubCategories />} />  
          <Route path="services" element={<DashboardServices />} />
          <Route path="coupons" element={<Coupons/>} />
          <Route path="medias" element={<Medias />} />
        </Route>
      </Routes>
    </Router>
  );
}
