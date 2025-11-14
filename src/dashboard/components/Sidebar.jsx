import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/services", label: "Services" },
    { to: "/dashboard/banners", label: "Banners" },
    { to: "/dashboard/categories", label: "Categories" },
    { to: "/dashboard/sub_categories", label: "Sub Categories" },
    { to: "/dashboard/coupons", label: "Coupons" },
    { to: "/dashboard/medias", label: "Medias" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 min-h-screen">
      <h2 className="text-3xl font-extrabold text-indigo-400">Admin Panel</h2>

      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`block p-3 rounded-xl font-medium transition
                ${pathname === item.to 
                  ? "bg-indigo-700 shadow-lg text-white" 
                  : "hover:bg-gray-700 text-gray-300"
                }
              `}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}



