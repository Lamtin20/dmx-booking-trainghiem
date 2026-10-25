import React, { useState } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { DeviceFrameWrapper } from './components/DeviceFrameWrapper';
import { QuaTangVIPHome } from './components/QuaTangVIPHome';
import { MiniAppHeader } from './components/MiniAppHeader';
import { ExploreTab } from './components/ExploreTab';
import { AiPlannerView } from './components/AiPlannerView';
import { TripsTab } from './components/TripsTab';
import { SupportTab } from './components/SupportTab';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { DemoControlCenter } from './components/DemoControlCenter';

const MainScreen: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { isInsideMiniApp, setIsInsideMiniApp, activeTab, setActiveTab } = useDemo();

  return (
    <>
      {!isInsideMiniApp ? (
        /* Host App Quà Tặng VIP Home */
        <QuaTangVIPHome />
      ) : (
        /* Mini App "Đi & Trải nghiệm" - Điện Máy Xanh */
        <div className="w-full min-h-full flex flex-col bg-slate-50 relative">
          <MiniAppHeader onOpenCart={onOpenCart} />

          {/* Tab Views */}
          <div className="flex-1">
            {activeTab === 'explore' && <ExploreTab onOpenCart={onOpenCart} />}
            {activeTab === 'planner' && <AiPlannerView onOpenCart={onOpenCart} />}
            {activeTab === 'trips' && <TripsTab onOpenSupport={() => setActiveTab('support')} />}
            {activeTab === 'support' && <SupportTab />}
          </div>

          {/* Floating Chatbot Action Button (FAB) ở góc dưới khi không ở tab Chatbot */}
          {activeTab !== 'planner' && (
            <button
              onClick={() => setActiveTab('planner')}
              className="fixed bottom-6 right-5 z-40 bg-gradient-to-r from-[#0071AF] to-[#009AE0] hover:from-[#005E93] hover:to-[#0071AF] text-white pl-3 pr-3.5 py-2 rounded-full shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 border-2 border-white cursor-pointer group animate-in fade-in slide-in-from-bottom-3 font-sans"
              title="Mở Chatbot Trợ lý Du lịch AI"
            >
              <div className="relative">
                <Bot className="w-5 h-5 text-[#FED100] stroke-[2.2]" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 border border-[#0071AF] animate-pulse" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-bold text-white tracking-tight">Chatbot AI</span>
                <span className="block text-[9px] text-[#FED100] font-semibold">Tư vấn 24/7</span>
              </div>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <DemoProvider>
      <DeviceFrameWrapper onOpenCart={() => setIsCartOpen(true)}>
        <MainScreen onOpenCart={() => setIsCartOpen(true)} />
      </DeviceFrameWrapper>

      {/* Cart & Checkout Modal */}
      <CartCheckoutModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Demo Control Center Modal */}
      <DemoControlCenter />
    </DemoProvider>
  );
}
