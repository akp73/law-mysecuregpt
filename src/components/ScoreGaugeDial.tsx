import React, { useState } from 'react';
import {
  DialReadinessBreakdown,
  QuestionsBreakdown,
  AgentQuestionRating,
  AgentReadinessToolBenchmark,
} from '../types/audit';
import {
  BarChart3,
  PieChart,
  ChevronDown,
  ChevronUp,
  Check,
  CheckCircle2,
  X,
  HelpCircle,
  ShieldCheck,
  Search,
  ShoppingBag,
  PhoneCall,
  Compass,
  FileDown,
  Scale,
  Sparkles,
} from 'lucide-react';

interface ScoreGaugeDialProps {
  score: number;
  domain: string;
  businessName?: string;
  dialBreakdown?: DialReadinessBreakdown;
  questionsBreakdown?: QuestionsBreakdown;
  tools?: AgentReadinessToolBenchmark[];
  onDownloadReport?: () => void;
}

export const ScoreGaugeDial: React.FC<ScoreGaugeDialProps> = ({
  score,
  domain,
  businessName,
  dialBreakdown,
  questionsBreakdown,
  onDownloadReport,
}) => {
  const [viewMode, setViewMode] = useState<'dials' | 'bars'>('dials');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  // Level determination:
  // Level 1 (0-29): Business doesn't exist.
  // Level 2 (30-49): Can't find products or services.
  // Level 3 (50-69): Can't buy or book a meeting.
  // Level 4 (70-84): Can't buy without human.
  // Level 5 (85-100): All system go.
  const level = dialBreakdown?.level ?? (
    score >= 85 ? 5 : score >= 70 ? 4 : score >= 50 ? 3 : score >= 30 ? 2 : 1
  );

  const getLevelTitle = (lvl: number, sc: number) => {
    if (sc >= 85 || lvl === 5) return 'All system go.';
    if (sc >= 70 || lvl === 4) return "Can't buy without human.";
    if (sc >= 50 || lvl === 3) return "Can't buy or book a meeting.";
    if (sc >= 30 || lvl === 2) return "Can't find products or services.";
    return "Business doesn't exist.";
  };

  const validLevelTitles = [
    'All system go.',
    "Can't buy without human.",
    "Can't buy or book a meeting.",
    "Can't find products or services.",
    "Business doesn't exist.",
  ];

  const rawLevelTitle = dialBreakdown?.levelTitle
    ? dialBreakdown.levelTitle.replace(/^AI Agent [sS]ays:\s*/i, '').trim()
    : getLevelTitle(level, score);

  const cleanLevelTitle = validLevelTitles.includes(rawLevelTitle)
    ? rawLevelTitle
    : getLevelTitle(level, score);

  const displayName = businessName || (
    domain.includes('cooley.com') ? 'Cooley LLP' :
    domain.includes('pg.com') ? 'Procter & Gamble' :
    domain.includes('teamlogicit.com') ? 'TeamLogic IT' :
    domain.replace(/^www\./, '').split('.')[0]
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );

  // Determine color based on score (matching TeamLogic IT palette)
  const getScoreColor = (val: number) => {
    if (val >= 80) return { stroke: '#008752', text: 'text-[#008752]', bg: 'bg-[#008752]', badge: 'bg-[#008752]', lightBg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (val >= 60) return { stroke: '#8CC63F', text: 'text-[#5d941b]', bg: 'bg-[#8CC63F]', badge: 'bg-[#689f24]', lightBg: 'bg-lime-50', border: 'border-lime-200' };
    if (val >= 40) return { stroke: '#F59E0B', text: 'text-amber-600', bg: 'bg-amber-500', badge: 'bg-amber-500', lightBg: 'bg-amber-50', border: 'border-amber-200' };
    if (val >= 25) return { stroke: '#F95738', text: 'text-[#F95738]', bg: 'bg-[#F95738]', badge: 'bg-[#F95738]', lightBg: 'bg-orange-50', border: 'border-orange-200' };
    return { stroke: '#EF4444', text: 'text-rose-600', bg: 'bg-rose-500', badge: 'bg-rose-600', lightBg: 'bg-rose-50', border: 'border-rose-200' };
  };

  const mainColor = getScoreColor(score);

  // Math for main semi-circle speedometer dial (from 180° to 0°, total length = π * R)
  const mainRadius = 90;
  const strokeWidth = 16;
  const arcLength = Math.PI * mainRadius; // ~282.74
  const mainOffset = arcLength * (1 - Math.min(100, Math.max(0, score)) / 100);

  // Exact weights applied to the composite score for each question
  // Exact weights applied to the composite score for each question
  const questionWeights: Record<string, string> = {
    find_and_trust: '25%',
    find_information: '20%',
    products_and_services: '25%',
    contact_easily: '15%',
    browse_easily: '15%',
    findAndTrust: '25%',
    findInformation: '20%',
    productsAndServices: '25%',
    contactEasily: '15%',
    browseEasily: '15%',
  };

  // Law firm specific question items matching attached style
  const defaultQuestions: AgentQuestionRating[] = [
    {
      id: 'find_and_trust',
      question: 'Can AI Find and Trust Your Law Firm?',
      score: questionsBreakdown?.findAndTrust?.score ?? 78,
      status: questionsBreakdown?.findAndTrust?.status ?? 'GOOD',
      summary: questionsBreakdown?.findAndTrust?.summary ?? 'Perplexity and ChatGPT cite Cooley LLP as a premier tech law firm, grounded by verified schema and office entities.',
      keyFactors: questionsBreakdown?.findAndTrust?.keyFactors ?? [
        { label: 'Verified Organization & LegalService schema', positive: true, impact: '+25 pts' },
        { label: 'Unrestricted robots.txt for AI search bots', positive: true, impact: '+25 pts' },
        { label: 'Missing /llms.txt manifest', positive: false, impact: '-10 pts' },
      ],
    },
    {
      id: 'find_information',
      question: 'Can AI Find Information About Your Law Practice?',
      score: questionsBreakdown?.findInformation?.score ?? 78,
      status: questionsBreakdown?.findInformation?.status ?? 'GOOD',
      summary: questionsBreakdown?.findInformation?.summary ?? 'Comprehensive partner bios and thought leadership articles are indexed, but practice group taxonomies lack machine schemas.',
      keyFactors: questionsBreakdown?.findInformation?.keyFactors ?? [
        { label: 'Attorney credentials and education indexed', positive: true, impact: '+30 pts' },
        { label: 'Venture capital practice pages mapped', positive: true, impact: '+25 pts' },
        { label: 'No structured practice group taxonomy hierarchy', positive: false, impact: '-15 pts' },
      ],
    },
    {
      id: 'products_and_services',
      question: 'Can AI Understand Your Specific Legal Services?',
      score: questionsBreakdown?.productsAndServices?.score ?? 78,
      status: questionsBreakdown?.productsAndServices?.status ?? 'GOOD',
      summary: questionsBreakdown?.productsAndServices?.summary ?? 'General practice areas are recognizable, but AI models cannot parse specific transactional advisory offerings.',
      keyFactors: questionsBreakdown?.productsAndServices?.keyFactors ?? [
        { label: 'Core emerging companies service categories clear', positive: true, impact: '+25 pts' },
        { label: 'No Schema.org OfferCatalog for deal advisory', positive: false, impact: '-20 pts' },
        { label: 'Fee ranges and retainer minimums unmentioned', positive: false, impact: '-20 pts' },
      ],
    },
    {
      id: 'contact_easily',
      question: 'Can Contact Your Law Firm or Book a Consultation Meeting?',
      score: questionsBreakdown?.contactEasily?.score ?? 78,
      status: questionsBreakdown?.contactEasily?.status ?? 'GOOD',
      summary: questionsBreakdown?.contactEasily?.summary ?? 'General switchboard telephone numbers are exposed, but automated agents cannot book consultations or route matters.',
      keyFactors: questionsBreakdown?.contactEasily?.keyFactors ?? [
        { label: 'Direct office phone numbers verified in schema', positive: true, impact: '+35 pts' },
        { label: 'No automated preliminary conflict check API', positive: false, impact: '-25 pts' },
        { label: 'Dynamic client-side intake forms block bot submission', positive: false, impact: '-20 pts' },
      ],
    },
    {
      id: 'browse_easily',
      question: 'Can AI Seamlessly Browse Your Website?',
      score: questionsBreakdown?.browseEasily?.score ?? 78,
      status: questionsBreakdown?.browseEasily?.status ?? 'GOOD',
      summary: questionsBreakdown?.browseEasily?.summary ?? 'Fast page responses and clear semantic HTML; slight friction from heavy client-side asset rendering.',
      keyFactors: questionsBreakdown?.browseEasily?.keyFactors ?? [
        { label: 'Semantic document tree and <main> landmark', positive: true, impact: '+30 pts' },
        { label: 'Permissive crawler allowlist in robots.txt', positive: true, impact: '+25 pts' },
        { label: 'Client-side JavaScript filter dependency for lawyers', positive: false, impact: '-15 pts' },
      ],
    },
  ];

  const questionsList: AgentQuestionRating[] = questionsBreakdown
    ? [
        {
          ...questionsBreakdown.findAndTrust,
          id: 'find_and_trust',
          question: 'Can AI Find and Trust Your Law Firm?',
          score: questionsBreakdown.findAndTrust.score ?? 78,
          status: questionsBreakdown.findAndTrust.status ?? 'GOOD',
        },
        {
          ...questionsBreakdown.findInformation,
          id: 'find_information',
          question: 'Can AI Find Information About Your Law Practice?',
          score: questionsBreakdown.findInformation.score ?? 78,
          status: questionsBreakdown.findInformation.status ?? 'GOOD',
        },
        {
          ...questionsBreakdown.productsAndServices,
          id: 'products_and_services',
          question: 'Can AI Understand Your Specific Legal Services?',
          score: questionsBreakdown.productsAndServices.score ?? 78,
          status: questionsBreakdown.productsAndServices.status ?? 'GOOD',
        },
        {
          ...questionsBreakdown.contactEasily,
          id: 'contact_easily',
          question: 'Can Contact Your Law Firm or Book a Consultation Meeting?',
          score: questionsBreakdown.contactEasily.score ?? 78,
          status: questionsBreakdown.contactEasily.status ?? 'GOOD',
        },
        {
          ...questionsBreakdown.browseEasily,
          id: 'browse_easily',
          question: 'Can AI Seamlessly Browse Your Website?',
          score: questionsBreakdown.browseEasily.score ?? 78,
          status: questionsBreakdown.browseEasily.status ?? 'GOOD',
        },
      ]
    : defaultQuestions;

  const selectedQuestion = questionsList.find((q) => q.id === selectedQuestionId);

  // Return specific Lucide icon before each question
  const getQuestionIcon = (id: string) => {
    switch (id) {
      case 'find_and_trust':
      case 'findAndTrust':
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#008752]" />;
      case 'find_information':
      case 'findInformation':
        return <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#008752]" />;
      case 'products_and_services':
      case 'productsAndServices':
        return <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-[#008752]" />;
      case 'contact_easily':
      case 'contactEasily':
        return <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-[#008752]" />;
      case 'browse_easily':
      case 'browseEasily':
      default:
        return <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#008752]" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
      {/* Top Bar: Audited Target Title & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <span className="text-base sm:text-lg md:text-xl font-bold text-slate-500">
            Audited Target:
          </span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {displayName}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('dials')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              viewMode === 'dials'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PieChart className="w-4 h-4 text-slate-600" />
            <span>5 Dials View</span>
          </button>
          <button
            onClick={() => setViewMode('bars')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              viewMode === 'bars'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-600" />
            <span>Bar Charts View</span>
          </button>
        </div>
      </div>

      {/* Main Section: Speedometer Composite Score on Left + 5 Question Rows on Right */}
      <div className="flex flex-col lg:flex-row items-stretch gap-8 pt-2">
        {/* Left Column: Composite Score Card */}
        <div className="w-full lg:w-80 shrink-0 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-3xs">
          <div className="w-full flex flex-col items-center">
            {/* Speedometer semi-circle arc SVG */}
            <div className="relative w-64 sm:w-72 h-36 sm:h-40 flex items-end justify-center -mt-1 sm:-mt-2">
              <svg
                viewBox="0 0 220 125"
                className="w-full h-full overflow-visible"
                aria-label={`Agent Readiness Score: ${score}`}
              >
                {/* Background inactive track */}
                <path
                  d="M 20 110 A 90 90 0 0 1 200 110"
                  fill="none"
                  stroke="#E8DDD3"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />

                {/* Active filled arc */}
                <path
                  d="M 20 110 A 90 90 0 0 1 200 110"
                  fill="none"
                  stroke={mainColor.stroke}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={arcLength}
                  strokeDashoffset={mainOffset}
                  style={{
                    transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease',
                  }}
                />
              </svg>

              {/* Centered Large Score Number */}
              <div className="absolute inset-x-0 bottom-1 sm:bottom-2 flex items-baseline justify-center select-none">
                <span
                  className={`text-5xl sm:text-6xl font-black font-mono tracking-tight leading-none ${mainColor.text}`}
                >
                  {score}
                </span>
                <span className="inline-flex items-baseline ml-1 sm:ml-1.5">
                  <span className="text-slate-400 font-light italic text-2xl sm:text-3xl mx-0.5 select-none opacity-80">
                    /
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-400 leading-none">
                    100
                  </span>
                </span>
              </div>
            </div>

            {/* Level Badge Pill */}
            <div className="mt-3">
              <span
                className={`inline-block text-white text-xs sm:text-[13px] font-black uppercase px-4 py-0.5 rounded-full tracking-wider shadow-xs ${mainColor.badge}`}
              >
                LEVEL {level}
              </span>
            </div>

            {/* AI Agent Says: */}
            <div className="text-lg sm:text-xl font-black text-slate-900 mt-2.5 tracking-tight">
              AI Agent Says:
            </div>

            {/* Descriptive Tier Title */}
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 tracking-tight px-2 leading-tight">
              {cleanLevelTitle}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">
              Composite Score
            </p>
          </div>

          {/* Download Detailed Report & What to Fix Button */}
          {onDownloadReport && (
            <div className="mt-6 w-full pt-2">
              <button
                type="button"
                onClick={onDownloadReport}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#008752] hover:bg-[#007043] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <FileDown className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span className="leading-snug">Download Detailed Report &amp; What to Fix</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Executive Summary Questions & Attached Mini-Dials */}
        <div className="flex-1 min-w-0 flex flex-col justify-between space-y-4">
          {/* Header */}
          <div className="pb-3 border-b border-slate-100">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              What AI Agents Found About Your Website?
            </h4>
          </div>

          {/* Dials View matching attached screenshot: Vertical rows with Icons before questions and Dials on the right */}
          {viewMode === 'dials' ? (
            <div className="divide-y divide-slate-100">
              {questionsList.map((q) => {
                const qColor = getScoreColor(q.score);
                const r = 26;
                const circumference = 2 * Math.PI * r; // ~163.36
                const ringOffset = circumference * (1 - Math.min(100, Math.max(0, q.score)) / 100);
                const isSelected = selectedQuestionId === q.id;
                const weight = questionWeights[q.id] || '20%';

                return (
                  <div key={q.id} className="py-3.5 sm:py-4 transition-all">
                    <div
                      onClick={() => setSelectedQuestionId(isSelected ? null : q.id)}
                      className="flex items-center justify-between gap-4 p-2 sm:p-3 rounded-xl hover:bg-slate-50/80 transition-all cursor-pointer group"
                    >
                      {/* Left Side: Icon before Question + Question Text + Weight Tag */}
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
                        {/* Question Icon */}
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 border border-emerald-200/90 text-[#008752] flex items-center justify-center shrink-0 shadow-3xs group-hover:scale-105 transition-transform">
                          {getQuestionIcon(q.id)}
                        </div>

                        {/* Question Title & Weight */}
                        <div className="min-w-0">
                          <h5 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#008752] transition-colors">
                            {q.question}
                          </h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200/90 rounded-md px-2 py-0.5 inline-flex items-center gap-1 shadow-3xs">
                              <span className="text-slate-500 font-sans font-medium">Weight:</span>
                              <span className="text-[#008752] font-black">{weight}</span>
                            </span>
                            <span className="text-[11px] text-slate-400 group-hover:text-[#008752] flex items-center gap-0.5 font-medium">
                              <span>{isSelected ? 'Hide details' : 'View details'}</span>
                              {isSelected ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Circular Mini-Dial & Status Badge */}
                      <div className="flex flex-col items-center justify-center shrink-0 pl-2">
                        {/* Circular Dial */}
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                            {/* Track */}
                            <circle
                              cx="32"
                              cy="32"
                              r={r}
                              fill="none"
                              stroke="#EAE3D9"
                              strokeWidth="4.5"
                            />
                            {/* Progress Arc */}
                            <circle
                              cx="32"
                              cy="32"
                              r={r}
                              fill="none"
                              stroke={qColor.stroke}
                              strokeWidth="4.5"
                              strokeLinecap="round"
                              strokeDasharray={circumference}
                              strokeDashoffset={ringOffset}
                              style={{
                                transition: 'stroke-dashoffset 0.8s ease-out',
                              }}
                            />
                          </svg>

                          {/* Centered Score */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-base sm:text-lg font-black font-mono leading-none ${qColor.text}`}>
                              {q.score}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono font-bold leading-none mt-0.5">
                              / 100
                            </span>
                          </div>
                        </div>

                        {/* Status Badge Pill */}
                        <div className="mt-1">
                          <span
                            className={`inline-block text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${qColor.lightBg} ${qColor.text} border ${qColor.border} shadow-3xs`}
                          >
                            {q.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Factor Drivers Drawer */}
                    {isSelected && (
                      <div className="mt-3 ml-2 sm:ml-14 p-4 sm:p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/90 shadow-2xs space-y-3 animate-fadeIn">
                        <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#008752]" />
                            <span className="font-bold text-xs sm:text-sm text-slate-900">
                              Factor Drivers for: <strong className="text-[#008752]">{q.question}</strong>
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedQuestionId(null);
                            }}
                            className="p-1 rounded hover:bg-emerald-100 text-slate-500 hover:text-slate-800 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {q.summary}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                          {q.keyFactors.map((factor, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-start gap-2 text-xs"
                            >
                              {factor.positive ? (
                                <CheckCircle2 className="w-4 h-4 text-[#008752] shrink-0 mt-0.5" />
                              ) : (
                                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-800">{factor.label}</div>
                                <div
                                  className={`font-mono text-[11px] font-bold mt-0.5 ${
                                    factor.positive ? 'text-[#008752]' : 'text-rose-600'
                                  }`}
                                >
                                  {factor.impact}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Bar Charts View Alternative */
            <div className="space-y-4 pt-1">
              {questionsList.map((q) => {
                const qColor = getScoreColor(q.score);
                const isSelected = selectedQuestionId === q.id;
                const weight = questionWeights[q.id] || '20%';

                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestionId(isSelected ? null : q.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#008752] bg-emerald-50/30 shadow-sm'
                        : 'border-slate-200 hover:border-[#008752]/40 bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-[#008752] flex items-center justify-center shrink-0">
                          {getQuestionIcon(q.id)}
                        </div>
                        <span className="font-extrabold text-sm sm:text-base text-slate-900">
                          {q.question}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded px-2 py-0.5">
                          Weight: <strong className="text-[#008752]">{weight}</strong>
                        </span>
                        <span
                          className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${qColor.lightBg} ${qColor.text} border ${qColor.border}`}
                        >
                          {q.status}
                        </span>
                        <span className="font-mono font-bold text-sm text-slate-900 w-16 text-right">
                          {q.score}/100
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${q.score}%`,
                          backgroundColor: qColor.stroke,
                        }}
                      />
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

