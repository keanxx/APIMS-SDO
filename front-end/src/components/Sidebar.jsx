
import { Home, Users, Palmtree, Briefcase, Heart, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from '@/lib/utils'

const sidebarItems = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/employees", label: "Employees", icon: Users },
  { path: "/retirement", label: "Retirement", icon: Palmtree },
  { path: "/position", label: "Position Classification", icon: Briefcase },
  { path: "/benefits", label: "Benefits", icon: Heart },
  { path: "/school-calendar", label: "School/Calendar Year", icon: Calendar },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1A3A1A] text-grass-grey border-r border-border">
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                  isActive
                    ? "bg-[#7CB342] text-[#1A3A1A] font-medium"
                    : "text-[#F0F4F0] hover:bg-[#F0F4F0]/10 hover:text-grass-grey"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;