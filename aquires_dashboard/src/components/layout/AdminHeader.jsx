import { useState } from "react";
import { Bell, LogOut, User, Calendar, ChevronDown, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { SidebarTrigger } from "../../components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Custom Range");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-[#e6e2e9] flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
      {/* Left Section - Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="text-[#1a1339] hover:text-[#4b1b91]" />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#635c8a]" />
          <input
            type="text"
            placeholder="Search TXN ID / UPI Ref / VPA / Merchant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#f8f7fa] border border-[#e6e2e9] rounded-lg text-sm text-[#1a1339] placeholder:text-[#635c8a] focus:outline-none focus:ring-2 focus:ring-[#c07bfc] focus:border-transparent focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center gap-3">
        {/* Date Range Dropdown */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e6e2e9] rounded-lg text-[#1a1339] text-sm font-medium hover:bg-[#f8f7fa] hover:border-[#c07bfc] transition-all">
                <Calendar className="w-4 h-4 text-[#4b1b91]" />
                {dateRange}
                <ChevronDown className="w-4 h-4 text-[#635c8a] transition-transform" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setDateRange("Today")}>
                Today
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Yesterday")}>
                Yesterday
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Last 7 Days")}>
                Last 7 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Last 30 Days")}>
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("This Month")}>
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Custom Range")}>
                Custom Range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Notification Bell */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f5effb] transition-colors relative group">
          <Bell className="w-5 h-5 text-[#1a1339] group-hover:text-[#4b1b91] transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#d74242] rounded-full animate-pulse shadow-sm"></span>
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f5effb] rounded-lg cursor-pointer transition-all group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4b1b91] to-[#c07bfc] text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                JD
              </div>
              <div className="text-sm">
                <div className="font-semibold text-[#1a1339] group-hover:text-[#4b1b91] transition-colors">
                  John Doe
                </div>
                <div className="text-xs text-[#635c8a]">Bank Admin</div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};