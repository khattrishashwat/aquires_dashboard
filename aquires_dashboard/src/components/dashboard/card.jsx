import React from 'react'

const Card = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white rounded-xl border border-[#e6e2e9] p-6 hover-lift shadow-sm hover:shadow-purple relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[#635c8a] text-sm font-medium mb-2">
              Total Transactions
            </p>
            <h3 className="text-[#1a1339] text-3xl font-bold mb-1 group-hover:text-[#4b1b91] transition-colors">
              {data?.totalTransactions?.value || '2,45,678'}
            </h3>
            <p className="text-[#635c8a] text-xs">{data?.totalTransactions?.subtitle || "Today's volume"}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${
                data?.totalTransactions?.trend?.startsWith('↑') 
                  ? 'bg-[#eaf6f0] text-[#34b277]' 
                  : 'bg-[#f9ecec] text-[#d74242]'
              }`}>
                {data?.totalTransactions?.trend || '↑ 12.5%'}
              </span>
              <span className="text-[#635c8a] text-sm">{data?.totalTransactions?.comparison || 'vs yesterday'}</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#f5effb] to-[#faf5ff] rounded-xl flex items-center justify-center group-hover:from-[#c07bfc] group-hover:to-[#4b1b91] transition-all duration-300 shadow-sm">
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
              className="lucide lucide-trending-up w-6 h-6 text-[#4b1b91] group-hover:text-white transition-colors"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
        </div>
      </div>

      {/* Success Rate Card */}
      <div className="bg-white rounded-xl border border-[#e6e2e9] p-6 hover-lift shadow-sm hover:shadow-purple relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[#635c8a] text-sm font-medium mb-2">Success Rate</p>
            <h3 className="text-[#1a1339] text-3xl font-bold mb-1 group-hover:text-[#4b1b91] transition-colors">
              {data?.successRate?.value || '96.8%'}
            </h3>
            <p className="text-[#635c8a] text-xs">{data?.successRate?.subtitle || 'vs 96.5% yesterday'}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${
                data?.successRate?.trend?.startsWith('↑') 
                  ? 'bg-[#eaf6f0] text-[#34b277]' 
                  : 'bg-[#f9ecec] text-[#d74242]'
              }`}>
                {data?.successRate?.trend || '↑ 0.3%'}
              </span>
              <span className="text-[#635c8a] text-sm">{data?.successRate?.comparison || 'vs yesterday'}</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#f5effb] to-[#faf5ff] rounded-xl flex items-center justify-center group-hover:from-[#c07bfc] group-hover:to-[#4b1b91] transition-all duration-300 shadow-sm">
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
              className="lucide lucide-circle-check-big w-6 h-6 text-[#4b1b91] group-hover:text-white transition-colors"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Failures Card */}
      <div className="bg-white rounded-xl border border-[#e6e2e9] p-6 hover-lift shadow-sm hover:shadow-purple relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[#635c8a] text-sm font-medium mb-2">Failures</p>
            <h3 className="text-[#1a1339] text-3xl font-bold mb-1 group-hover:text-[#4b1b91] transition-colors">
              {data?.failures?.value || '7,851'}
            </h3>
            <p className="text-[#635c8a] text-xs">{data?.failures?.subtitle || 'Declined transactions'}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${
                data?.failures?.trend?.startsWith('↑') 
                  ? 'bg-[#f9ecec] text-[#d74242]' 
                  : 'bg-[#eaf6f0] text-[#34b277]'
              }`}>
                {data?.failures?.trend || '↑ 8.2%'}
              </span>
              <span className="text-[#635c8a] text-sm">{data?.failures?.comparison || 'vs yesterday'}</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#f5effb] to-[#faf5ff] rounded-xl flex items-center justify-center group-hover:from-[#c07bfc] group-hover:to-[#4b1b91] transition-all duration-300 shadow-sm">
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
              className="lucide lucide-circle-x w-6 h-6 text-[#4b1b91] group-hover:text-white transition-colors"
            >
              <circle cx={12} cy={12} r={10} />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Avg TAT Card */}
      <div className="bg-white rounded-xl border border-[#e6e2e9] p-6 hover-lift shadow-sm hover:shadow-purple relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[#635c8a] text-sm font-medium mb-2">Avg TAT</p>
            <h3 className="text-[#1a1339] text-3xl font-bold mb-1 group-hover:text-[#4b1b91] transition-colors">
              {data?.avgTAT?.value || '267 ms'}
            </h3>
            <p className="text-[#635c8a] text-xs">{data?.avgTAT?.subtitle || 'P95 = 524 ms'}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${
                data?.avgTAT?.trend?.includes('↓') 
                  ? 'bg-[#eaf6f0] text-[#34b277]' 
                  : 'bg-[#f9ecec] text-[#d74242]'
              }`}>
                {data?.avgTAT?.trend || '↓ 15%'}
              </span>
              <span className="text-[#635c8a] text-sm">{data?.avgTAT?.comparison || 'faster'}</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#f5effb] to-[#faf5ff] rounded-xl flex items-center justify-center group-hover:from-[#c07bfc] group-hover:to-[#4b1b91] transition-all duration-300 shadow-sm">
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
              className="lucide lucide-clock w-6 h-6 text-[#4b1b91] group-hover:text-white transition-colors"
            >
              <circle cx={12} cy={12} r={10} />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>
      </div>

      {/* TPS Card */}
      <div className="bg-white rounded-xl border border-[#e6e2e9] p-6 hover-lift shadow-sm hover:shadow-purple relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[#635c8a] text-sm font-medium mb-2">TPS</p>
            <h3 className="text-[#1a1339] text-3xl font-bold mb-1 group-hover:text-[#4b1b91] transition-colors">
              {data?.tps?.value || '2,845'}
            </h3>
            <p className="text-[#635c8a] text-xs">{data?.tps?.subtitle || 'Transactions per second'}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-md ${
                data?.tps?.trend?.startsWith('↑') 
                  ? 'bg-[#eaf6f0] text-[#34b277]' 
                  : 'bg-[#f9ecec] text-[#d74242]'
              }`}>
                {data?.tps?.trend || '↑ 9.2%'}
              </span>
              <span className="text-[#635c8a] text-sm">{data?.tps?.comparison || 'vs yesterday'}</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#f5effb] to-[#faf5ff] rounded-xl flex items-center justify-center group-hover:from-[#c07bfc] group-hover:to-[#4b1b91] transition-all duration-300 shadow-sm">
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
              className="lucide lucide-zap w-6 h-6 text-[#4b1b91] group-hover:text-white transition-colors"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card