import { useState } from "react";
import { Calendar, ChevronDown, Search, Bell, User, LogOut } from "lucide-react";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminHeader = ({ onOpenRightSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Today");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);


  const dateOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range"
  ];

  return (
    <header className="h-16 bg-white border-b border-[#e6e2e9] flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
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

      <div className="flex items-center gap-3">
        {/* Date Range Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e6e2e9] rounded-lg text-[#1a1339] text-sm font-medium hover:bg-[#f8f7fa] hover:border-[#c07bfc] transition-all"
          >
            <Calendar className="w-4 h-4 text-[#4b1b91]" />
            {dateRange}
            <ChevronDown className={`w-4 h-4 text-[#635c8a] transition-transform ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDateDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDateDropdownOpen(false)}
              />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#e6e2e9] rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {dateOptions.map((option, idx) => (
                  <button
                    key={option}
                    onClick={() => {
                      setDateRange(option);
                      setIsDateDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm transition-colors
                      ${dateRange === option ? 'bg-[#f5effb] text-[#4b1b91] font-medium' : 'text-[#1a1339] hover:bg-[#f8f7fa] hover:text-[#4b1b91]'}
                      ${idx === 0 ? 'rounded-t-lg' : ''}
                      ${idx === dateOptions.length - 1 ? 'rounded-b-lg border-t border-[#e6e2e9]' : ''}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notification Bell - Opens Right Sidebar */}
        <button 
          onClick={() => onOpenRightSidebar("notifications")}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f5effb] transition-colors relative group"
        >
          <Bell className="w-5 h-5 text-[#1a1339] group-hover:text-[#4b1b91] transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#d74242] rounded-full animate-pulse shadow-sm" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div 
 onClick={() => {
  onOpenRightSidebar("profile");
}}            className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f5effb] rounded-lg cursor-pointer transition-all group"
          >
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

         
        </div>
      </div>
    </header>
  );
};