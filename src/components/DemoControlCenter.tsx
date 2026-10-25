import React, { useState } from 'react';
import { 
  Sliders, 
  X, 
  RotateCcw, 
  Play, 
  Users, 
  Calendar, 
  Tag, 
  AlertTriangle, 
  WifiOff, 
  Clock, 
  ShieldAlert, 
  CheckCircle,
  TrendingUp,
  Ban,
  HelpCircle
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { USER_PERSONAS } from '../data/personas';
import { TEST_SCENARIOS, TestScenario } from '../data/scenarios';

export const DemoControlCenter: React.FC = () => {
  const { 
    showControlCenter, 
    setShowControlCenter, 
    activePersona, 
    setActivePersonaId, 
    demoDate, 
    setDemoDate, 
    campaigns, 
    toggleCampaignActive, 
    chaos, 
    setChaos, 
    runScenario, 
    activeScenarioId, 
    resetDemoData, 
    showToast,
    setIsInsideMiniApp,
    setActiveTab
  } = useDemo();

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeTab, setActiveControlTab] = useState<'scenarios' | 'chaos' | 'campaigns' | 'personas'>('scenarios');

  if (!showControlCenter) return null;

  const scenarioCategories = ['All', 'Family', 'Couple', 'Group', 'Business', 'Senior', 'AI Planner', 'Campaign', 'Edge Case'];

  const filteredScenarios = TEST_SCENARIOS.filter(s => {
    if (filterCategory === 'All') return true;
    return s.category === filterCategory;
  });

  const handleExecuteScenario = (sc: TestScenario) => {
    runScenario(sc);
    setIsInsideMiniApp(true);

    if (sc.category === 'AI Planner') {
      setActiveTab('planner');
    } else {
      setActiveTab('explore');
    }

    setShowControlCenter(false);
    showToast(`Đã nạp thành công kịch bản #${sc.id}: "${sc.title}"`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 text-slate-100 rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                <span>DEMO CONTROL CENTER</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Admin & QA Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Điều phối 25 kịch bản kiểm thử, giả lập lỗi thanh toán, hết chỗ, trễ mạng và cấu hình chiến dịch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetDemoData}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Khôi phục toàn bộ dữ liệu ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Dữ Liệu</span>
            </button>
            <button
              onClick={() => setShowControlCenter(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 text-xs font-bold gap-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveControlTab('scenarios')}
            className={`py-3 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'scenarios' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            25 Kịch Bản Kiểm Thử ({TEST_SCENARIOS.length})
          </button>
          <button
            onClick={() => setActiveControlTab('chaos')}
            className={`py-3 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'chaos' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Chaos & Giả Lập Lỗi Hệ Thống
          </button>
          <button
            onClick={() => setActiveControlTab('campaigns')}
            className={`py-3 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'campaigns' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Cấu Hình Ưu Đãi ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveControlTab('personas')}
            className={`py-3 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'personas' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Hồ Sơ Khách Hàng ({USER_PERSONAS.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: 25 TEST SCENARIOS */}
          {activeTab === 'scenarios' && (
            <div className="space-y-3">
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {scenarioCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      filterCategory === cat
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredScenarios.map((sc) => {
                  const isActive = activeScenarioId === sc.id;

                  return (
                    <div
                      key={sc.id}
                      className={`p-3.5 rounded-2xl border transition flex flex-col justify-between ${
                        isActive
                          ? 'border-amber-400 bg-amber-400/10 ring-1 ring-amber-400'
                          : 'border-slate-800 bg-slate-800/60 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-700 text-amber-300">
                            #{sc.id} • {sc.category}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Đang chạy
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-white leading-tight">{sc.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                          <span className="text-slate-300 font-medium">Bối cảnh:</span> {sc.initialCondition}
                        </p>
                        <p className="text-[11px] text-emerald-400 mt-1 line-clamp-2">
                          <span className="text-emerald-300 font-medium">Kỳ vọng:</span> {sc.expectedResult}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">1-click nạp tự động</span>
                        <button
                          onClick={() => handleExecuteScenario(sc)}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition flex items-center gap-1 cursor-pointer shadow"
                        >
                          <Play className="w-3 h-3 fill-slate-950" />
                          <span>Chạy ngay</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CHAOS & SYSTEM ERRORS */}
          {activeTab === 'chaos' && (
            <div className="space-y-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Giả Lập Kết Quả Thanh Toán</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'success', label: 'Thành công 100%', color: 'text-emerald-400' },
                    { id: 'failed', label: 'Thanh toán thất bại', color: 'text-rose-400' },
                    { id: 'processing', label: 'Chờ đối tác xử lý', color: 'text-amber-400' },
                    { id: 'partial_failure', label: 'Thành công một phần', color: 'text-sky-400' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setChaos(prev => ({ ...prev, paymentOutcome: item.id as any }))}
                      className={`p-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                        chaos.paymentOutcome === item.id
                          ? 'border-amber-400 bg-amber-400/20 text-white ring-1 ring-amber-400'
                          : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className={item.color}>{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles for Edge Cases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Out of stock */}
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Ban className="w-4 h-4 text-rose-400" />
                      <span>Giả lập Hết Phòng / Hết Chỗ</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Báo lỗi khi bấm thanh toán</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={chaos.simulateOutOfStock}
                    onChange={(e) => setChaos(prev => ({ ...prev, simulateOutOfStock: e.target.checked }))}
                    className="w-5 h-5 accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Price Surge */}
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      <span>Giả lập Giá Tăng Đột Xuất (+15%)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Đối tác cập nhật biểu phí mới</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={chaos.simulatePriceSurge}
                    onChange={(e) => setChaos(prev => ({ ...prev, simulatePriceSurge: e.target.checked }))}
                    className="w-5 h-5 accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Offline mode */}
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <WifiOff className="w-4 h-4 text-rose-400" />
                      <span>Giả lập Rớt Mạng (Offline)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Mô phỏng mất kết nối Internet</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={chaos.isOffline}
                    onChange={(e) => setChaos(prev => ({ ...prev, isOffline: e.target.checked }))}
                    className="w-5 h-5 accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Auto-pass Demo */}
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Chế độ "Auto-pass" Demo</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Tự động điền & xuất vé nhanh</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={chaos.autoPassDemo}
                    onChange={(e) => setChaos(prev => ({ ...prev, autoPassDemo: e.target.checked }))}
                    className="w-5 h-5 accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Latency Slider */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span>Độ trễ phản hồi mạng mô phỏng</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{chaos.networkDelayMs} ms</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="300"
                  value={chaos.networkDelayMs}
                  onChange={(e) => setChaos(prev => ({ ...prev, networkDelayMs: parseInt(e.target.value, 10) }))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CAMPAIGNS CONFIG */}
          {activeTab === 'campaigns' && (
            <div className="space-y-2.5">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center justify-between gap-4 text-xs">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-xs">{camp.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300">
                        {camp.code || camp.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{camp.description}</p>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Ngân sách còn lại: <span className="font-mono text-emerald-400 font-bold">{camp.totalBudgetRemaining.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCampaignActive(camp.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                      camp.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {camp.isActive ? 'Đang chạy' : 'Tạm dừng'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PERSONAS */}
          {activeTab === 'personas' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {USER_PERSONAS.map((p) => {
                const isSelected = activePersona.id === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActivePersonaId(p.id);
                      showToast(`Đã chuyển sang hồ sơ "${p.name}"`);
                    }}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400/10 ring-1 ring-amber-400'
                        : 'border-slate-800 bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <img src={p.avatarUrl} alt={p.name} className="w-11 h-11 rounded-full object-cover border border-slate-600 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{p.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400 text-slate-950 uppercase">
                          {p.memberTier}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.phone}</div>
                      <div className="text-[11px] text-amber-300 font-bold mt-1">
                        {p.pointBalance.toLocaleString('vi-VN')} điểm VIP
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
