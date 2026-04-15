import React from 'react';
import { X, User, Bell, Settings, LogOut, Shield, CreditCard, AlertCircle, MessageSquare, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

export const AdminRightSidebar = ({ isOpen, onClose, content }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose();
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (content === "profile") {
      return (
        <div className="flex flex-col h-full">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-br from-[#4b1b91] to-[#c07bfc] p-6 text-white">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold mb-4 border-4 border-white/30">
                JD
              </div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-white/80 text-sm mt-1">Bank Admin</p>
              <p className="text-white/60 text-xs mt-1">john.doe@bank.com</p>
            </div>
          </div>

          {/* Profile Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f5effb] transition-colors group">
              <User className="w-5 h-5 text-[#635c8a] group-hover:text-[#4b1b91]" />
              <span className="flex-1 text-left text-[#1a1339] group-hover:text-[#4b1b91]">My Profile</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f5effb] transition-colors group">
              <Shield className="w-5 h-5 text-[#635c8a] group-hover:text-[#4b1b91]" />
              <span className="flex-1 text-left text-[#1a1339] group-hover:text-[#4b1b91]">Security Settings</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f5effb] transition-colors group">
              <Bell className="w-5 h-5 text-[#635c8a] group-hover:text-[#4b1b91]" />
              <span className="flex-1 text-left text-[#1a1339] group-hover:text-[#4b1b91]">Notification Preferences</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f5effb] transition-colors group">
              <CreditCard className="w-5 h-5 text-[#635c8a] group-hover:text-[#4b1b91]" />
              <span className="flex-1 text-left text-[#1a1339] group-hover:text-[#4b1b91]">Payment Methods</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f5effb] transition-colors group">
              <Settings className="w-5 h-5 text-[#635c8a] group-hover:text-[#4b1b91]" />
              <span className="flex-1 text-left text-[#1a1339] group-hover:text-[#4b1b91]">Account Settings</span>
            </button>

            <div className="border-t border-[#e6e2e9] my-4"></div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors group"
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="flex-1 text-left text-red-600">Logout</span>
            </button>
          </div>
        </div>
      );
    }

    if (content === "notifications") {
      return (
        <div className="h-full flex flex-col">
  <div className="relative bg-gradient-to-b from-[#f5effb] to-white p-6 border-b border-[#e6e2e9]">
    <button className="absolute top-4 right-4 w-10 h-10 bg-[#d74242] rounded-full flex items-center justify-center hover:bg-[#c23333] transition-colors shadow-sm"
      onClick={onClose}
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-x w-5 h-5 text-white"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4b1b91] to-[#6b2bb8] flex items-center justify-center shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bell w-6 h-6 text-white"
        >
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#1a1339]">Notifications</h2>
        <p className="text-sm text-[#635c8a]">3 unread notifications</p>
      </div>
    </div>
  </div>
  <div className="px-6 py-3 border-b border-[#e6e2e9] flex items-center justify-between bg-[#fafafa]">
    <button className="text-sm font-medium text-[#4b1b91] hover:text-[#6b2bb8] transition-colors">
      Mark all as read
    </button>
    <button className="text-sm font-medium text-[#635c8a] hover:text-[#1a1339] transition-colors">
      Clear all
    </button>
  </div>
  <div className="flex-1 overflow-y-auto">
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer bg-[#fafeff]">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#fef3e8] text-[#d74242]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-triangle-alert w-5 h-5"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#1a1339]">
              High-Value Transaction Alert
            </h3>
            <span className="w-2 h-2 bg-[#4b1b91] rounded-full flex-shrink-0 mt-1.5" />
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            Transaction of ₹5,00,000 from merchant "TechStore India" flagged for
            review.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Risk
            </span>
            <span className="text-xs text-[#635c8a]">5 min ago</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer bg-[#fafeff]">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#fff3e6] text-[#f39c12]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-indian-rupee w-5 h-5"
          >
            <path d="M6 3h12" />
            <path d="M6 8h12" />
            <path d="m6 13 8.5 8" />
            <path d="M6 13h3" />
            <path d="M9 13c6.667 0 6.667-10 0-10" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#1a1339]">
              Failed Settlement Detected
            </h3>
            <span className="w-2 h-2 bg-[#4b1b91] rounded-full flex-shrink-0 mt-1.5" />
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            3 transactions failed settlement for merchant "Fashion Hub". Total
            amount: ₹45,230.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Settlement
            </span>
            <span className="text-xs text-[#635c8a]">12 min ago</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer bg-[#fafeff]">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#e6f9f0] text-[#27ae60]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users w-5 h-5"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx={9} cy={7} r={4} />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#1a1339]">
              New Merchant Onboarded
            </h3>
            <span className="w-2 h-2 bg-[#4b1b91] rounded-full flex-shrink-0 mt-1.5" />
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            "Digital Mart Solutions" has been successfully onboarded and
            activated.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Merchant
            </span>
            <span className="text-xs text-[#635c8a]">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer ">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f8f7fa] text-[#635c8a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield w-5 h-5"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#635c8a]">
              Risk Rule Triggered
            </h3>
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            Velocity check rule triggered for VPA user@paytm - 15 transactions
            in 10 minutes.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Risk
            </span>
            <span className="text-xs text-[#635c8a]">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer ">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f8f7fa] text-[#635c8a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-info w-5 h-5"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#635c8a]">
              Daily Settlement Report Ready
            </h3>
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            Settlement report for Feb 10, 2026 is now available for download.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Reports
            </span>
            <span className="text-xs text-[#635c8a]">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer ">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f8f7fa] text-[#635c8a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-check-big w-5 h-5"
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#635c8a]">
              Reconciliation Complete
            </h3>
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            3-way reconciliation completed successfully. 2,456 transactions
            matched.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Reconciliation
            </span>
            <span className="text-xs text-[#635c8a]">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer ">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f8f7fa] text-[#635c8a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-triangle-alert w-5 h-5"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#635c8a]">
              Chargeback Received
            </h3>
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            New chargeback filed for transaction ID TXN987654321. Amount:
            ₹12,450.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Dispute
            </span>
            <span className="text-xs text-[#635c8a]">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer ">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f8f7fa] text-[#635c8a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-info w-5 h-5"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#635c8a]">
              System Maintenance Scheduled
            </h3>
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            Scheduled maintenance on Feb 15, 2026 from 2:00 AM to 4:00 AM IST.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              System
            </span>
            <span className="text-xs text-[#635c8a]">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-[#e6e2e9] hover:bg-[#f8f7fa] transition-colors cursor-pointer ">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f8f7fa] text-[#635c8a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trending-up w-5 h-5"
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#635c8a]">
              Transaction Volume Milestone
            </h3>
          </div>
          <p className="text-xs text-[#635c8a] line-clamp-2 mb-2">
            Congratulations! Your platform processed 1M transactions this month.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-[#f5effb] text-[#4b1b91] rounded-full font-medium">
              Achievement
            </span>
            <span className="text-xs text-[#635c8a]">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="p-4 border-t border-[#e6e2e9] bg-white">
    <button className="w-full py-3 bg-gradient-to-r from-[#4b1b91] to-[#6b2bb8] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all">
      View All Notifications
    </button>
  </div>
</div>

      );
    }

    return null;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out translate-x-0">
        {renderContent()}
      </div>
    </>
  );
};