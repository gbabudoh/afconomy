"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Shield,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Globe,
  CreditCard,
  ArrowLeft,
  Tv
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => {
        if (data.user && data.user.role === "ADMIN") {
          setUser(data.user);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => router.push("/admin/login"));
  }, [pathname, router]);

  // Don't show layout on login page - Move after hooks
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Countries", icon: Globe, path: "/admin/countries" },
    { name: "Economic Data", icon: BarChart3, path: "/admin/data" },
    { name: "Financial Assets", icon: CreditCard, path: "/admin/financials" },
    { name: "News Management", icon: Newspaper, path: "/admin/news" },
    { name: "Research Intelligence", icon: BarChart3, path: "/admin/research" },
    { name: "TV Broadcast", icon: Tv, path: "/admin/tv" },
    { name: "Polls", icon: BarChart3, path: "/admin/polls" },
    { name: "Live Chat", icon: MessageSquare, path: "/admin/chat" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#DCDCDC] border-r border-slate-200 flex flex-col transition-all duration-300 z-50`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            {isSidebarOpen && <span className="font-bold text-lg tracking-tight">Admin<span className="text-primary">CP</span></span>}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                pathname === item.path 
                  ? "bg-primary text-white font-bold shadow-md shadow-primary/20" 
                  : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
              }`}
            >
              <item.icon className={`h-5 w-5 ${pathname === item.path ? "text-white" : "group-hover:scale-110 transition-transform"}`} />
              {isSidebarOpen && <span className="text-sm">{item.name}</span>}
              {pathname === item.path && isSidebarOpen && <ChevronRight className="ml-auto h-4 w-4 text-white/70" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-3">
          {isSidebarOpen && user && (
            <div className="px-3 py-2 bg-white/50 rounded-xl">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name || user.email.split('@')[0]}</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Admin</p>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer`}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg w-64">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search command..." 
                className="bg-transparent border-none text-xs text-slate-900 focus:outline-none w-full placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all text-xs font-bold border border-slate-200 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Main Site
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8F8F8] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
