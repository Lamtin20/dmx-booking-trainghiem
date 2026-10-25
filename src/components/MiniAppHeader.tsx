import React from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Heart, 
  Compass, 
  Sparkles, 
  Luggage, 
  HelpCircle,
  Coins,
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
    activePersona, 
    orders,
    setActiveServiceCategory
  } = useDemo();

  const activeOrdersCount = orders.filter(o => o.overallStatus === 'confirmed' || o.overallStatus === 'paid_processing_partners').length;

  return (
    <div className="sticky top-0 z-40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border-b border-slate-100">
      {/* 1. Brand Header */}
      <div className="bg-[#0074C8] text-white px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Back to Quà Tặng VIP */}
        <button
          onClick={() => {
            setActiveServiceCategory(null);
            setIsInsideMiniApp(false);
          }}
          className="flex items-center gap-0.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1.5 rounded-xl transition cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-[11px] font-bold">Quà Tặng VIP</span>
        </button>

        {/* Center: Brand Name & Slogan */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black tracking-tight uppercase">Đi & Trải nghiệm</span>
            <span className="px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-black bg-[#FFDF00] text-[#123653]">
              ĐIỆN MÁY XANH
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-sky-100 italic">"Chuyến đi theo ý bạn"</span>
        </div>

        {/* Right Actions: Wishlist & Cart */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('explore')}
            className="p-1.5 rounded-xl hover:bg-white/15 text-white/90 hover:text-white transition relative cursor-pointer"
            title="Yêu thích"
          >
            <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'fill-rose-400 text-rose-400' : ''}`} />
          </button>

          <button
            onClick={onOpenCart}
            className="p-1.5 rounded-xl bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-bold transition relative cursor-pointer shadow-xs"
            title="Giỏ dịch vụ"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Mini App Segmented Navigation Tabs */}
      <div className="grid grid-cols-4 bg-white p-1 border-b border-slate-100 text-[11px] font-bold">
        <button
          onClick={() => {
            setActiveServiceCategory(null);
            setActiveTab('explore');
          }}
          className={`py-2 px-1 rounded-xl transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeTab === 'explore'
              ? 'bg-sky-50 text-[#0074C8]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Khám phá</span>
        </button>

        <button
          onClick={() => {
            setActiveServiceCategory(null);
            setActiveTab('planner');
          }}
          className={`py-2 px-1 rounded-xl transition flex flex-col items-center justify-center gap-0.5 cursor-pointer relative ${
            activeTab === 'planner'
              ? 'bg-sky-50 text-[#0074C8]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="relative">
            <Bot className="w-4 h-4 text-[#0074C8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute -top-0.5 -right-0.5 animate-pulse" />
          </span>
          <span className="font-extrabold">Chatbot</span>
        </button>

        <button
          onClick={() => {
            setActiveServiceCategory(null);
            setActiveTab('trips');
          }}
          className={`py-2 px-1 rounded-xl transition flex flex-col items-center justify-center gap-0.5 cursor-pointer relative ${
            activeTab === 'trips'
              ? 'bg-sky-50 text-[#0074C8]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Luggage className="w-4 h-4" />
          <span>Chuyến đi</span>
          {activeOrdersCount > 0 && (
            <span className="absolute top-1.5 right-3 w-3.5 h-3.5 rounded-full bg-[#0074C8] text-white text-[8px] font-bold flex items-center justify-center">
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveServiceCategory(null);
            setActiveTab('support');
          }}
          className={`py-2 px-1 rounded-xl transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            activeTab === 'support'
              ? 'bg-sky-50 text-[#0074C8]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Hỗ trợ</span>
        </button>
      </div>
    </div>
  );
};
