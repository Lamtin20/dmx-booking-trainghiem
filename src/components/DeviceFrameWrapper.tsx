import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Sliders, 
  Sparkles, 
  AlertCircle, 
  ShoppingBag, 
  ArrowLeft,
  Columns,
  UserCheck
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { DesktopLaptopView } from './DesktopLaptopView';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  onOpenCart: () => void;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({ children, onOpenCart }) => {
  const { 
    isInsideMiniApp, 
    setIsInsideMiniApp, 
    showControlCenter, 
    setShowControlCenter, 
    cartItems, 
    activePersona, 
    toastMessage,
    viewMode,
    setViewMode
  } = useDemo();

  // Kiểm tra kích thước màn hình thực tế của người dùng
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Nếu người dùng đang mở trực tiếp trên điện thoại (iPhone hoặc Android), tự động hiển thị 100% Native Fullscreen!
  if (isMobileScreen) {
    return (
      <div className="w-full min-h-screen bg-[#F4F6F8] text-[#1D2129] flex flex-col font-sans antialiased">
        {/* Screen Content - Fullscreen chuẩn Native Mobile App */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Floating Quick Control Button: Nút tròn nhỏ tinh tế ở góc dưới trái phía trên tabbar, không chiếm diện tích hay đè ô chat */}
        <button
          onClick={() => setShowControlCenter(true)}
          className="fixed bottom-24 left-3 z-40 w-7 h-7 rounded-full bg-slate-900/40 backdrop-blur text-white flex items-center justify-center text-[10px] shadow-sm border border-white/20 opacity-30 hover:opacity-100 transition cursor-pointer"
          title="Mở Control Center kiểm thử"
        >
          ⚙️
        </button>

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-16 left-4 right-4 bg-slate-900/95 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-sky-500/40 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <p className="flex-1 font-medium">{toastMessage}</p>
          </div>
        )}
      </div>
    );
  }

  // TRÊN LAPTOP / DESKTOP: Cung cấp giao diện trực quan, linh hoạt
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* Top System Simulation Bar */}
      <header className="w-full bg-slate-950/90 backdrop-blur border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-extrabold text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            <span>MÔ PHỎNG ĐIỆN MÁY XANH • ĐI & TRẢI NGHIỆM</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Người dùng: <strong>{activePersona.name}</strong> ({activePersona.honorific})</span>
          </div>
        </div>

        {/* View Switchers & Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setViewMode('mobile_frame')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'mobile_frame' || viewMode === 'auto' ? 'bg-[#0074C8] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Xem giao diện chuẩn màn hình điện thoại iPhone/Samsung"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Khung Di Động</span>
            </button>

            <button
              onClick={() => setViewMode('desktop_wide')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'desktop_wide' ? 'bg-[#0074C8] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Xem giao diện màn hình rộng trực quan cho Laptop/Desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>💻 Bản Laptop Trực Quan</span>
            </button>

            <button
              onClick={() => setViewMode('split_view')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === 'split_view' ? 'bg-[#0074C8] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Xem song song cả 2 giao diện cùng lúc"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>📱+💻 Song Song</span>
            </button>
          </div>

          {/* Quick Host App Toggle */}
          <button
            onClick={() => setIsInsideMiniApp(!isInsideMiniApp)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition cursor-pointer shadow-xs"
          >
            {isInsideMiniApp ? (
              <>
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Về Quà Tặng VIP</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Mở "Đi & Trải nghiệm"</span>
              </>
            )}
          </button>

          {/* Control Center */}
          <button
            onClick={() => setShowControlCenter(!showControlCenter)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition cursor-pointer shadow"
          >
            <Sliders className="w-3.5 h-3.5 fill-slate-950" />
            <span>Control Center (25 Scenarios)</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Body */}
      <main className="w-full flex-1 flex items-center justify-center p-3 sm:p-6 overflow-x-hidden">
        {viewMode === 'desktop_wide' ? (
          /* BẢN LAPTOP / DESKTOP TOÀN CẢNH TRỰC QUAN */
          <div className="w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-white min-h-[85vh]">
            <DesktopLaptopView onOpenCart={onOpenCart} />
          </div>
        ) : viewMode === 'split_view' ? (
          /* CHẾ ĐỘ SONG SONG: PHONE Ở BÊN TRÁI, LAPTOP Ở BÊN PHẢI */
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[390px] h-[820px] bg-black rounded-[46px] p-3 shadow-2xl ring-1 ring-slate-700 flex flex-col overflow-hidden">
                {/* Speaker Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 ring-2 ring-slate-800 z-50" />
                {/* Screen Viewport */}
                <div className="w-full h-full bg-[#FAFAFA] text-slate-900 rounded-[38px] overflow-hidden flex flex-col relative">
                  {/* Status Bar */}
                  <div className="w-full bg-[#FEF7DE] text-slate-800 text-[11px] px-6 pt-2 pb-1 flex items-center justify-between font-mono select-none shrink-0 z-40">
                    <span className="font-bold">02:08</span>
                    <div className="flex items-center gap-1.5 opacity-90 text-[10px]">
                      <span>5G</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold text-[9px]">100%</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar">
                    {children}
                  </div>
                  <div className="w-full bg-white/80 py-1.5 flex justify-center items-center shrink-0">
                    <div className="w-32 h-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-slate-700 overflow-hidden min-h-[820px]">
              <DesktopLaptopView onOpenCart={onOpenCart} />
            </div>
          </div>
        ) : (
          /* CHẾ ĐỘ KHUNG DI ĐỘNG (SAMSUNG / IPHONE FRAME) */
          <div className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-black rounded-[46px] p-3 shadow-2xl ring-1 ring-slate-700 shadow-sky-950/40 flex flex-col overflow-hidden transition-all duration-300">
            {/* Top Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 ring-2 ring-slate-800 z-50" />

            {/* Screen Viewport */}
            <div className="w-full h-full bg-[#FAFAFA] text-slate-900 rounded-[38px] overflow-hidden flex flex-col relative">
              {/* iPhone / Android Status Bar (Khớp ảnh 02:08, pin 100%) */}
              <div className="w-full bg-[#FEF7DE] text-slate-800 text-[11px] px-6 pt-2 pb-1 flex items-center justify-between font-mono select-none shrink-0 z-40">
                <span className="font-bold">02:08</span>
                <div className="flex items-center gap-1.5 opacity-90 text-[10px]">
                  <span>5G</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold text-[9px]">100%</span>
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar">
                {children}
              </div>

              {/* Virtual Home Bar Pill */}
              <div className="w-full bg-white/80 py-1.5 flex justify-center items-center shrink-0">
                <div className="w-32 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 max-w-md bg-slate-900/95 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xl border border-sky-500/40 flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <p className="flex-1 font-medium">{toastMessage}</p>
        </div>
      )}
    </div>
  );
};
