import React from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Heart, 
  Compass, 
  Luggage, 
  HelpCircle,
  Bot
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const MiniAppHeader: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { 
    setIsInsideMiniApp, 
    activeTab, 
    setActiveTab, 
    cartItems, 
    wishlistIds, 
    orders,
    setActiveServiceCategory
  } = useDemo();

  const activeOrdersCount = orders.filter(o => o.overallStatus === 'confirmed' || o.overallStatus === 'paid_processing_partners').length;

  return (
    <div className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200/80 font-sans">
      {/* 1. Header chuẩn nhận diện Điện Máy Xanh */}
      <div className="bg-[#0071AF] text-white px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-xs">
        {/* Nút quay lại Quà Tặng VIP */}
        <button
          onClick={() => {
            setActiveServiceCategory(null);
            setIsInsideMiniApp(false);
          }}
          className="flex items-center gap-1 text-xs font-medium text-white/95 hover:text-white bg-black/15 hover:bg-black/25 px-2.5 py-1.5 rounded-xl transition cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          <span className="text-[12px] font-bold">Quà Tặng VIP</span>
        </button>

        {/* Logo Điện Máy Xanh & Tên mini app */}
        <div className="flex items-center justify-center gap-2 min-w-0">
          <img src="/icons/di-trai-nghiem.svg" alt="" className="w-8 h-8 rounded-[10px] shrink-0 shadow-sm ring-1 ring-white/30" />
          <div className="flex flex-col items-start min-w-0 leading-tight">
            <span className="text-[14px] font-bold text-white whitespace-nowrap">Đi &amp; Trải nghiệm</span>
            <span className="text-[10.5px] font-semibold text-[#FED100] whitespace-nowrap">Điện Máy Xanh</span>
          </div>
        </div>

        {/* Nút Yêu thích & Giỏ hàng */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('explore')}
            className="p-1.5 rounded-xl hover:bg-white/15 text-white/90 hover:text-white transition cursor-pointer"
            title="Yêu thích"
          >
            <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'fill-rose-400 text-rose-400' : ''}`} />
          </button>

          <button
            onClick={onOpenCart}
            className="p-1.5 rounded-xl bg-[#FED100] hover:bg-[#E5BC00] text-[#1D2129] font-bold transition relative cursor-pointer shadow-xs"
            title="Giỏ dịch vụ"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E11B1E] text-white text-[9px] font-black flex items-center justify-center shadow">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Thanh Tabs chuẩn Mobile Native App Điện Máy Xanh */}
      <div className="grid grid-cols-4 bg-white border-b border-slate-100 text-xs">
        {[
          { id: 'explore', label: 'Khám phá', icon: Compass },
          { id: 'planner', label: 'Chatbot AI', icon: Bot, isNew: true },
          { id: 'trips', label: 'Chuyến đi', icon: Luggage, badge: activeOrdersCount },
          { id: 'support', label: 'Hỗ trợ', icon: HelpCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveServiceCategory(null);
                setActiveTab(tab.id as any);
              }}
              className={`py-2.5 px-1 flex flex-col items-center justify-center gap-1 transition cursor-pointer relative border-b-2 ${
                isActive
                  ? 'border-[#0071AF] text-[#0071AF] font-bold bg-sky-50/40'
                  : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5] text-[#0071AF]' : 'text-slate-500'}`} />
                {tab.isNew && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11B1E] absolute -top-0.5 -right-0.5 animate-pulse" />
                )}
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 px-1 min-w-[14px] h-3.5 rounded-full bg-[#0071AF] text-white text-[8px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[11px] leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
