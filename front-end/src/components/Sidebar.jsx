import { Home, Users, Palmtree, Briefcase, Heart, Calendar, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from '@/lib/utils';
import { useState } from "react";

const sidebarItems = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/employees", label: "Employees", icon: Users },
  { path: "/retirement", label: "Retirement", icon: Palmtree },
  {
    path: "/position-management",
    label: "Position Management",
    icon: Briefcase,
    children: [
      { path: "/position-management/position", label: "Position" },
      { path: "/position-management/items", label: "Items" },
      { path: "/position-management/salary", label: "Salary Tranches" },
    ],
  },
  { path: "/service-record", label: "Service Record", icon: Heart },
  { path: "/school-calendar", label: "School/Calendar Year", icon: Calendar },
  { path: "/appointment-details", label: "Appointment Details", icon: Briefcase },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  return (
    <>
      {/* Backdrop (for mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed h-screen md:static z-50 w-64 bg-[#1A3A1A] text-grass-grey border-r border-border transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="p-6 flex justify-between items-center md:hidden">
          <h2 className="text-white font-semibold text-lg">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <nav className="space-y-2 p-4 md:p-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.path}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setOpenSubmenu(openSubmenu === item.path ? null : item.path);
                    } else {
                      navigate(item.path);
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-[#7CB342] text-[#1A3A1A] font-medium"
                      : "text-[#F0F4F0] hover:bg-[#F0F4F0]/10 hover:text-grass-grey"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 ml-auto transition-transform",
                        openSubmenu === item.path ? "rotate-180" : "rotate-0"
                      )}
                    />
                  )}
                </button>

                {/* Render Submenu */}
                {hasChildren && openSubmenu === item.path && (
                  <div className="ml-8 space-y-2">
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.path;

                      return (
                        <button
                          key={child.path}
                          onClick={() => {
                            navigate(child.path);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors",
                            isChildActive
                              ? "bg-[#A5D6A7] text-[#1A3A1A] font-medium"
                              : "text-[#F0F4F0] hover:bg-[#F0F4F0]/10 hover:text-grass-grey"
                          )}
                        >
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;