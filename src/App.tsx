/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Wind, ShieldCheck, Star, Calculator, Calendar, CheckCircle2, 
  MapPin, Phone, Award, Clock, ArrowRight, ChevronRight, 
  Sliders, Sparkles, AlertCircle, FileText, Check, Menu, X, HelpCircle, UserCheck
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Customizer State (allows user to personalize their brand name & region)
  const [brandName, setBrandName] = useState('클린에어 프로');
  const [region, setRegion] = useState('서울·경기·인천 전지역');
  const [phoneNum, setPhoneNum] = useState('1588-9999');

  // Calculator State
  const [acType, setAcType] = useState<'wall' | 'ceiling1' | 'ceiling4' | 'stand' | 'twin'>('wall');
  const [quantity, setQuantity] = useState(1);
  const [includeSteam, setIncludeSteam] = useState(true);
  const [includeCoating, setIncludeCoating] = useState(true);
  const [includeOutdoor, setIncludeOutdoor] = useState(false);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookAddress, setBookAddress] = useState('');
  const [bookDate, setBookDate] = useState('');
  const [bookSuccess, setBookSuccess] = useState(false);
  const [bookingsList, setBookingsList] = useState<any[]>([]);

  // FAQ Expanded State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Pricing calculation
  const basePrices = {
    wall: 65000,
    ceiling1: 95000,
    ceiling4: 130000,
    stand: 120000,
    twin: 175000
  };

  const acNames = {
    wall: '벽걸이형 에어컨',
    ceiling1: '천장형 1웨이 에어컨',
    ceiling4: '천장형 4웨이 에어컨',
    stand: '스탠드형 에어컨',
    twin: '투인원 (벽걸이+스탠드)'
  };

  const calculateTotal = () => {
    let base = basePrices[acType] * quantity;
    let options = 0;
    if (includeSteam) options += 15000 * quantity;
    if (includeCoating) options += 20000 * quantity;
    if (includeOutdoor) options += 30000 * quantity;
    return base + options;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookPhone || !bookAddress || !bookDate) {
      alert('모든 필수 정보를 입력해 주세요.');
      return;
    }
    const newBooking = {
      id: Math.floor(100000 + Math.random() * 900000),
      name: bookName,
      phone: bookPhone,
      address: bookAddress,
      date: bookDate,
      item: `${acNames[acType]} ${quantity}대`,
      total: calculateTotal(),
      status: '예약접수완료'
    };
    setBookingsList([newBooking, ...bookingsList]);
    setBookSuccess(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Bar Contract (3-Zone Contract) */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {brandName}
              </span>
              <span className="block text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider uppercase">
                상위노출 1위 에어컨케어
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Single-line, whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">서비스 안내</a>
            <a href="#calculator" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">간편 견적비교</a>
            <a href="#process" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">청소 전후 비교</a>
            <a href="#reviews" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">고객 후기</a>
            <a href="#seo-strategy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">상위노출 전략비법</a>
            <a href="#faq" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">자주 묻는 질문</a>
          </nav>

          {/* Zone 3: Primary Action & Dark Mode Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium"
              title="다크모드 전환"
            >
              {darkMode ? '☀️ 라이트' : '🌙 다크'}
            </button>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl hover:from-cyan-500 hover:to-teal-500 shadow-md shadow-cyan-600/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>실시간 예약·상담</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 pb-2">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-700 dark:text-slate-200">서비스 안내</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-700 dark:text-slate-200">간편 견적비교</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-700 dark:text-slate-200">청소 전후 비교</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-700 dark:text-slate-200">고객 후기</a>
            <a href="#seo-strategy" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-700 dark:text-slate-200">상위노출 전략비법</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-1.5 text-slate-700 dark:text-slate-200">자주 묻는 질문</a>
          </div>
        )}
      </header>

      {/* Brand Customization Banner for the User */}
      <section className="bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 text-white py-3 px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>[나만의 상위노출 홈페이지 커스텀]</strong> 업체명과 지역을 변경하여 바로 실전에 활용하세요!</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">업체명:</span>
              <input 
                type="text" 
                value={brandName} 
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs w-28 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">지역:</span>
              <input 
                type="text" 
                value={region} 
                onChange={(e) => setRegion(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs w-32 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">연락처:</span>
              <input 
                type="text" 
                value={phoneNum} 
                onChange={(e) => setPhoneNum(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs w-24 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-6 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>구글·네이버 검색 상위노출 1위 에어컨 케어 플랫폼</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              숨은 곰팡이와 악취, <br />
              <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">완전분해 고온스팀 살균</span>으로 해결하세요
            </h1>
            <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {region} 출장 방문! 삼성·LG 공식 서비스 경력의 베테랑 기사가 직접 방문하여 에어컨 내부 깊숙한 냉각핀의 찌든 때와 세균을 완벽하게 세척합니다.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-600/25 hover:from-cyan-500 hover:to-teal-500 transition-all flex items-center gap-3 text-base"
              >
                <span>실시간 간편 견적 및 예약하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={`tel:${phoneNum}`}
                className="px-6 py-4 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-slate-800 dark:text-slate-200"
              >
                <Phone className="w-5 h-5 text-cyan-600" />
                <span>전화 상담: {phoneNum}</span>
              </a>
            </div>

            {/* Proof Metric Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">4.98 / 5.0</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">네이버 평점 (3,420+ 리뷰)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">A/S 및 하자 보상제</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">친환경</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">150℃ 고온스팀 살균</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img 
                src="/src/assets/images/hero_ac_cleaning_1794561753261.jpg" 
                alt="에어컨 분해 청소 현장" 
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-widest bg-cyan-500/80 px-2.5 py-1 rounded-md font-semibold">전문가 인증 시공</span>
                  <h3 className="text-lg font-bold mt-2">고압 세척 가이드와 특수 장비로 누수 걱정 없는 완벽 세척</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Price Calculator Section */}
      <section id="calculator" className="py-20 px-6 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              우리 집 에어컨 청소 비용 미리 계산하기
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-base">
              부가세 포함, 출장비 무료! 에어컨 종류와 추가 옵션을 선택하시면 즉시 예상 견적을 확인하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-8 bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  01. 에어컨 종류 선택
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'wall', label: '벽걸이형', price: '6.5만원부터' },
                    { id: 'ceiling1', label: '천장형(1웨이)', price: '9.5만원부터' },
                    { id: 'ceiling4', label: '천장형(4웨이)', price: '13만원부터' },
                    { id: 'stand', label: '스탠드형', price: '12만원부터' },
                    { id: 'twin', label: '투인원 패키지', price: '17.5만원부터' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAcType(item.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        acType === item.id 
                          ? 'border-cyan-600 bg-cyan-50/50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 shadow-sm' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  02. 대수 선택 (수량)
                </label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-12 text-center text-slate-900 dark:text-white">{quantity}대</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  03. 프리미엄 추가 옵션 (선택)
                </label>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-cyan-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={includeSteam} 
                        onChange={(e) => setIncludeSteam(e.target.checked)}
                        className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">150℃ 고온 고압 스팀 살균</div>
                        <div className="text-xs text-slate-500">각종 세균 및 곰팡이 포자 박멸</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">+1.5만/대</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-cyan-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={includeCoating} 
                        onChange={(e) => setIncludeCoating(e.target.checked)}
                        className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">친환경 항균 탈취 코팅</div>
                        <div className="text-xs text-slate-500">세척 후 곰팡이 재발 방지 및 상쾌한 향 유지</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">+2.0만/대</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-cyan-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={includeOutdoor} 
                        onChange={(e) => setIncludeOutdoor(e.target.checked)}
                        className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">실외기 응축수 핀 종합 세척</div>
                        <div className="text-xs text-slate-500">전기세 절감 및 냉방 효율 극대화</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">+3.0만/대</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Summary & Checkout Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 rounded-2xl shadow-xl sticky top-28 border border-slate-800">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <span className="text-sm text-slate-400">선택하신 서비스</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-full font-semibold">100% 정액제 보장</span>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">{acNames[acType]} × {quantity}대</span>
                  <span className="font-semibold">₩{(basePrices[acType] * quantity).toLocaleString()}</span>
                </div>
                {includeSteam && (
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>고온 스팀 살균</span>
                    <span>+₩{(15000 * quantity).toLocaleString()}</span>
                  </div>
                )}
                {includeCoating && (
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>친환경 항균 코팅</span>
                    <span>+₩{(20000 * quantity).toLocaleString()}</span>
                  </div>
                )}
                {includeOutdoor && (
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>실외기 종합 세척</span>
                    <span>+₩{(30000 * quantity).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between mb-8">
                <div>
                  <div className="text-xs text-slate-400">총 예상 견적 (VAT 포함)</div>
                  <div className="text-3xl font-extrabold text-cyan-400 mt-1">
                    ₩{calculateTotal().toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">예상 소요 시간</div>
                  <div className="text-sm font-semibold mt-1">약 {quantity * 50}분 내외</div>
                </div>
              </div>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-base"
              >
                <span>이 견적으로 실시간 예약하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-3">
                * 현장 특이사항(오염도가 심한 경우 등)에 따라 추가 비용이 발생할 수 있으나 사전 고지합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Capabilities Section (Bento Grid) */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            에어컨 청소가 왜 필수적일까요?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3 text-base">
            겉보기엔 깨끗해 보여도 내부 증발기(열교환기)와 송풍팬에는 검은 곰팡이와 세균이 가득합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">냉각핀 곰팡이·세균 박멸</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              레지오넬라균과 곰팡이 포자는 호흡기 질환, 아토피, 알레르기의 주원인입니다. 고온 스팀과 친환경 전용 약품으로 완벽하게 살균합니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">전기세 절감 및 냉방력 향상</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              열교환기에 낀 먼지와 이물질을 제거하면 열 교환 효율이 회복되어 냉방 속도가 빨라지고 최대 20%의 전기요금을 절감할 수 있습니다.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">시큼하고 꿉꿉한 냄새 제거</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              에어컨 작동 시 발생하는 불쾌한 냄새의 원인을 송풍팬과 드레인 판까지 철저하게 고압 세척하여 상쾌한 바람만 나오도록 만듭니다.
            </p>
          </div>
        </div>
      </section>

      {/* Before & After Comparison Showcase */}
      <section id="process" className="py-20 px-6 bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              청소 전 vs 청소 후 완벽한 차이
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-base">
              전문 장비와 분해 세척을 통해 눈에 보이지 않던 구석까지 새것처럼 되살립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <img 
                src="/src/assets/images/before_after_ac_1794561751577.jpg" 
                alt="에어컨 청소 전후 비교" 
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                4단계 표준 분해 세척 프로세스
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">사전 점검 및 가이드 설치</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">에어컨 정상 작동 여부 확인 및 주변 오염 방지용 전용 세척 가이드 설치</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">완전 분해 및 전용 약품 도포</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">필터, 프론트 패널, 송풍팬까지 안전하게 해체 후 친환경 세정제 분사</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">고온 스팀 & 고압 세척</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">150℃ 고온 스팀과 고압 세척기로 냉각핀 속 찌든 때와 세균 싹쓸이</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">피톤치드 탈취 & 사후 점검</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">향균 코팅 및 피톤치드 연무 소독 후 완벽한 조립 및 작동 테스트 완료</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>실제 이용 고객 만족도 4.98 / 5.0</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            고객님들이 직접 남겨주신 생생한 후기
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: '김서연 고객님',
              region: '서울 강남구 역삼동',
              item: '스탠드 + 벽걸이 투인원 패키지',
              text: '여름 되기 전에 냄새가 너무 심해서 신청했는데 기사님 두분이 오셔서 정말 꼼꼼하게 분해해서 세척해주셨습니다. 검은 물 나오는 거 보고 경악했네요.. 앞으로 정기적으로 맡길게요!',
              date: '2026.05.12'
            },
            {
              name: '박민수 고객님',
              region: '경기 성남시 분당구',
              item: '천장형 4웨이 시스템에어컨',
              text: '사무실 에어컨 4대 한꺼번에 맡겼는데 작업 속도도 빠르시고 주변에 물 한 방울 안 튀게 보양 작업 완벽하게 해주셨습니다. 공기부터 달라졌어요 대만족입니다!',
              date: '2026.05.08'
            },
            {
              name: '이지은 고객님',
              region: '인천 연수구 송도동',
              item: '벽걸이 에어컨 2대',
              text: '아기가 있어서 곰팡이 걱정됐는데 친환경 세제에 고온스팀까지 해주셔서 안심입니다. 정직한 가격표 그대로 추가 요금도 전혀 없어서 너무 믿음이 가요.',
              date: '2026.05.01'
            }
          ].map((rev, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  "{rev.text}"
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{rev.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{rev.region} · {rev.item}</div>
                </div>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO & High-Ranking Strategy Guide (For Business Owners / Users) */}
      <section id="seo-strategy" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              상위노출 1위 비법 공개
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mt-4">
              구글·네이버 검색 상위노출 홈페이지 구조
            </h2>
            <p className="text-slate-300 mt-3 text-base">
              본 홈페이지는 네이버 및 구글 알고리즘이 선호하는 완벽한 SEO 구조와 전환율 최적화(CRO) 기법을 적용하여 제작되었습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-lg">H1·H2 키워드 최적화</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                검색 사용자가 가장 찾는 키워드("에어컨 청소", "벽걸이 에어컨 분해청소", "스팀살균")를 헤딩 태그에 자연스럽게 배치하여 검색 로봇의 수집 효율을 극대화합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-lg">로컬 SEO & JSON-LD</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                LocalBusiness 및 FAQ Schema.org 구조화된 데이터를 삽입하여 네이버 플레이스 및 구글 지도 검색 결과에서 리치 스니펫(별점, 가격대)으로 노출되도록 설계했습니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-lg">체류 시간 & 인터랙션</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                실시간 견적 계산기와 전후 비교 갤러리 등 인터랙티브 요소를 통해 사용자의 체류 시간을 늘리고 이탈률을 낮추어 검색 엔진으로부터 높은 점수를 받습니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-bold text-lg">모바일 퍼스트 반응형</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                전체 방문자의 90% 이상인 모바일 사용자 환경을 고려하여 터치 타겟과 1초 이내 로딩 속도, 간편 예약 폼을 최우선으로 배치하였습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3 text-base">
            에어컨 청소에 대해 고객님들이 가장 궁금해하시는 점들을 모았습니다.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: '에어컨 청소는 언제 받는 것이 가장 좋나요?',
              a: '냉방 가동을 본격적으로 시작하기 전인 4월~5월이나, 사용이 끝난 후 9월~10월에 받는 것이 가장 좋습니다. 겨울 동안 쌓인 먼지와 곰팡이를 미리 제거하여 호흡기 건강을 지킬 수 있습니다.'
            },
            {
              q: '청소할 때 주변이나 바닥에 물이 떨어지거나 더러워지지 않나요?',
              a: '전용 가대(세척 커버)를 단단히 설치하고 고압 세척을 진행하기 때문에 벽지나 바닥으로 물이 튀거나 오염될 염려가 전혀 없습니다. 작업 완료 후 주변 정리까지 완벽하게 마무리해 드립니다.'
            },
            {
              q: '청소 소요 시간은 얼마나 걸리나요?',
              a: '벽걸이형은 약 40~50분, 스탠드형은 약 1시간~1시간 30분, 천장형 4웨이는 약 1시간 20분 정도 소요됩니다. (오염 상태에 따라 약간의 차이가 있을 수 있습니다.)'
            },
            {
              q: '청소 후 고장이 나면 A/S를 받을 수 있나요?',
              a: `네! ${brandName}은 시공 후 3개월간 무상 A/S 및 100% 책임 보상제를 운영하고 있습니다. 서비스 후 이상이 발생할 경우 언제든 연락 주시면 즉시 조치해 드립니다.`
            }
          ].map((item, idx) => (
            <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">Q.</span>
                  {item.q}
                </span>
                <span className={`transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">{brandName}</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              구글 및 네이버 검색 상위노출 최적화 구조를 바탕으로 고객님께 최고의 에어컨 케어 서비스를 제공하는 전문 브랜드입니다.
            </p>
            <div className="text-xs text-slate-500">
              고객센터 대표번호: <strong className="text-white">{phoneNum}</strong> (연중무휴 08:00 ~ 20:00)
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">바로가기</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">서비스 안내</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">간편 견적비교</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">청소 전후 비교</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">고객 후기</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">법적 고지</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              상호명: {brandName} | 서비스 지역: {region} <br />
              본 사이트는 구글 AI Studio를 통해 상위노출 구조로 빌드된 에어컨 청소 전문 랜딩페이지 템플릿입니다.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setBookingModalOpen(false); setBookSuccess(false); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-6 h-6" />
            </button>

            {bookSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">실시간 예약이 완료되었습니다!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  담당 기사가 배정된 후 입력하신 연락처로 해피콜을 드립니다. ({region} 전지역 출동)
                </p>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between"><span className="text-slate-500">예약 상품:</span> <span className="font-semibold text-slate-900 dark:text-white">{acNames[acType]} {quantity}대</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">총 예상 금액:</span> <span className="font-semibold text-cyan-600">₩{calculateTotal().toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">희망 방문일:</span> <span className="font-semibold text-slate-900 dark:text-white">{bookDate}</span></div>
                </div>
                <button
                  onClick={() => { setBookingModalOpen(false); setBookSuccess(false); }}
                  className="w-full py-3 bg-slate-900 dark:bg-slate-800 text-white font-semibold rounded-xl mt-4"
                >
                  확인
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">간편 실시간 예약 및 상담</h3>
                  <p className="text-xs text-slate-500 mt-1">정보를 남겨주시면 10분 내로 해피콜을 드립니다.</p>
                </div>

                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold text-cyan-900 dark:text-cyan-200">{acNames[acType]} ({quantity}대)</div>
                    <div className="text-cyan-700 dark:text-cyan-400 mt-0.5">선택 옵션 포함</div>
                  </div>
                  <div className="text-lg font-extrabold text-cyan-700 dark:text-cyan-300">
                    ₩{calculateTotal().toLocaleString()}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">고객 성함 *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="홍길동"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">연락처 (휴대폰 번호) *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="010-0000-0000"
                      value={bookPhone}
                      onChange={(e) => setBookPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">설치 주소 (지역) *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="서울시 강남구 역삼로 123"
                      value={bookAddress}
                      onChange={(e) => setBookAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">희망 방문일시 *</label>
                    <input 
                      type="date" 
                      required
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold rounded-xl shadow-md hover:from-cyan-500 hover:to-teal-500 transition-all text-sm"
                >
                  예약 신청 완료하기
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
