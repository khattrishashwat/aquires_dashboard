import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  FileCheck,
  Database,
  Shield,
  Activity,
  FileText,
  ChevronRight,
  Store,
  Briefcase,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Settings,
  Clock,
  Calendar,
  Repeat,
  RefreshCw,
  Receipt,
  Scale,
  Gavel,
  Eye,
  Zap,
  Bell,
  ListChecks,
  FileBarChart,
  ScrollText,
  UserCog,
  Network,
} from "lucide-react";

const AdminSidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Transactions", icon: CreditCard, path: "/transactions" },
    {
      name: "Merchant Management",
      icon: Users,
      submenu: true,
      items: [
        { name: "All Merchants", icon: Store, path: "/merchants/all" },
        { name: "Merchant Portfolio", icon: Briefcase, path: "/merchants/portfolio" },
        { name: "Merchant Risk", icon: AlertTriangle, path: "/merchants/risk" },
        { name: "Payout Summary", icon: DollarSign, path: "/merchants/payout" },
      ],
    },
    {
      name: "Reconciliation",
      icon: FileCheck,
      submenu: true,
      items: [
        { name: "Dashboard", icon: BarChart3, path: "/reconciliation/dashboard" },
        { name: "NPCI File Management", icon: FileText, path: "/reconciliation/npci-files" },
        { name: "Settlement Ageing", icon: Clock, path: "/reconciliation/settlement-ageing" },
        { name: "Daily Settlement", icon: Calendar, path: "/reconciliation/daily-settlement" },
        { name: "Transaction Recon", icon: Repeat, path: "/reconciliation/transaction-recon" },
        { name: "Unsettled Txns", icon: RefreshCw, path: "/reconciliation/unsettled" },
        { name: "Refund & Reversal", icon: Receipt, path: "/reconciliation/refund-reversal" },
      ],
    },
    {
      name: "UDIR Monitoring",
      icon: Database,
      submenu: true,
      items: [
        { name: "UDIR Dashboard", icon: BarChart3, path: "/udir/dashboard" },
        { name: "Dispute Management", icon: Scale, path: "/udir/dispute" },
      ],
    },
    {
      name: "Risk & Fraud",
      icon: Shield,
      submenu: true,
      items: [
        { name: "Fraud Monitoring", icon: Eye, path: "/risk/fraud-monitoring" },
        { name: "Transaction Monitor", icon: Activity, path: "/risk/transaction-monitor" },
        { name: "Risk Rules", icon: Gavel, path: "/risk/rules" },
        { name: "Settlement Risk", icon: DollarSign, path: "/risk/settlement-risk" },
      ],
    },
    {
      name: "Monitoring",
      icon: Activity,
      submenu: true,
      items: [
        { name: "PSP / TPAP Monitor", icon: Network, path: "/monitoring/psp-tpap" },
        { name: "Alerts & Escalation", icon: Bell, path: "/monitoring/alerts" },
        { name: "All Transactions", icon: ListChecks, path: "/monitoring/all-transactions" },
      ],
    },
    {
      name: "System",
      icon: Settings,
      submenu: true,
      items: [
        { name: "Reports", icon: FileBarChart, path: "/system/reports" },
        { name: "Audit Logs", icon: ScrollText, path: "/system/audit-logs" },
        { name: "User Management", icon: UserCog, path: "/system/users" },
        { name: "TPAP Management", icon: Network, path: "/system/tpap" },
      ],
    },
  ];

  return (
    <aside className="w-72 bg-[#170d3f] flex flex-col overflow-y-auto h-screen">
      {/* Logo Section */}
      <div className="h-[74px] flex items-center px-4 border-b border-[rgba(192,123,252,0.2)] flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c07bfc] to-[#4b1b91] flex items-center justify-center">
          <span className="text-white text-lg font-bold">L</span>
        </div>
        <div className="ml-3">
          <div className="text-[#c07bfc] text-sm font-semibold">Luckpay</div>
          <div className="text-[#d9cde4] text-xs opacity-60">PayTech Dashboard</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.name} className="mb-1">
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all text-[#d9cde4] hover:bg-[rgba(192,123,252,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      openMenus[item.name] ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openMenus[item.name] && (
                  <div className="ml-8 pl-2 border-l border-[rgba(192,123,252,0.1)] mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.path}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-[#d9cde4] hover:bg-[rgba(192,123,252,0.08)] text-sm"
                      >
                        {subItem.icon && <subItem.icon className="w-3.5 h-3.5 opacity-70" />}
                        <span>{subItem.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                onClick={() => setActiveMenu(item.name)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 rounded-lg mb-1 transition-all ${
                    activeMenu === item.name || isActive
                      ? "bg-[rgba(192,123,252,0.15)] border-l-2 border-[#c07bfc] text-[#c07bfc]"
                      : "text-[#d9cde4] hover:bg-[rgba(192,123,252,0.08)]"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[rgba(192,123,252,0.2)] flex-shrink-0 space-y-3">
        <a
          href="/login"
          className="block w-full px-3 py-2 bg-[rgba(192,123,252,0.1)] text-[#c07bfc] text-center text-xs font-medium rounded-lg hover:bg-[rgba(192,123,252,0.15)] transition-colors"
        >
          View Login Page
        </a>
        <p className="text-[#d9cde4] text-xs opacity-50 text-center">
          © 2026 BankAcquire
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;