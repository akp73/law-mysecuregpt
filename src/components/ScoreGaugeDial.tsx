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

  // Law firm specific question items matching image #2
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
      score: questionsBreakdown?.findInformation?.score ?? 72,
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
      score: questionsBreakdown?.productsAndServices?.score ?? 65,
      status: questionsBreakdown?.productsAndServices?.status ?? 'FAIR',
      summary: questionsBreakdown?.productsAndServices?.summary ?? 'General practice areas are recognizable, but AI models cannot parse specific transactional advisory offerings.',
      keyFactors: questionsBreakdown?.productsAndServices?.keyFactors ?? [
        { label: 'Core emerging companies service categories clear', positive: true, impact: '+25 pts' },
        { label: 'No Schema.org OfferCatalog for deal advisory', positive: false, impact: '-20 pts' },
        { label: 'Fee ranges and retainer minimums unmentioned', positive: false, impact: '-20 pts' },
      ],
    },
    {
      id: 'contact_easily',
      question: 'Can AI Contact Your Law Firm or Book a Consultation?',
      score: questionsBreakdown?.contactEasily?.score ?? 58,
      status: questionsBreakdown?.contactEasily?.status ?? 'FAIR',
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
      score: questionsBreakdown?.browseEasily?.score ?? 68,
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
          question: questionsBreakdown.findAndTrust.question.includes('Law Firm')
            ? questionsBreakdown.findAndTrust.question
            : 'Can AI Find and Trust Your Law Firm?',
        },
        {
          ...questionsBreakdown.findInformation,
          id: 'find_information',
          question: questionsBreakdown.findInformation.question.includes('Law Practice')
            ? questionsBreakdown.findInformation.question
            : 'Can AI Find Information About Your Law Practice?',
        },
        {
          ...questionsBreakdown.productsAndServices,
          id: 'products_and_services',
          question: questionsBreakdown.productsAndServices.question.includes('Legal Services')
            ? questionsBreakdown.productsAndServices.question
            : 'Can AI Understand Your Specific Legal Services?',
        },
        {
          ...questionsBreakdown.contactEasily,
          id: 'contact_easily',
          question: questionsBreakdown.contactEasily.question.includes('Law Firm')
            ? questionsBreakdown.contactEasily.question
            : 'Can AI Contact Your Law Firm or Book a Consultation?',
        },
        {
          ...questionsBreakdown.browseEasily,
          id: 'browse_easily',
          question: questionsBreakdown.browseEasily.question.includes('Seamlessly')
            ? questionsBreakdown.browseEasily.question
            : 'Can AI Seamlessly Browse Your Website?',
        },
      ]
    : defaultQuestions;

  const selectedQuestion = questionsList.find((q) => q.id === selectedQuestionId);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">
      {/* Top Bar: Audited Target Title & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <span className="text-sm sm:text-base md:text-lg font-bold text-slate-500">
            Audited Target:
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {displayName}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('dials')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'dials'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>5 Dials View</span>
          </button>
          <button
            onClick={() => setViewMode('bars')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'bars'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Bar Charts View</span>
          </button>
        </div>
      </div>

      {/* Hero Section: Speedometer Composite Score on Left + 5 Dials Directly Next to it on Right */}
      <div className="flex flex-col xl:flex-row items-stretch gap-6 pt-1">
        {/* Left Column: Speedometer Dial & Composite Score */}
        <div className="w-full xl:w-72 2xl:w-80 shrink-0 bg-gradient-to-b from-slate-50/90 to-emerald-50/20 border border-slate-200/90 rounded-2xl p-5 flex flex-col items-center justify-between text-center shadow-3xs">
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
            <div className="mt-2.5">
              <span
                className={`inline-block text-white text-xs sm:text-[13px] font-black uppercase px-3.5 py-0.5 rounded-full tracking-wider shadow-xs ${mainColor.badge}`}
              >
                LEVEL {level}
              </span>
            </div>

            {/* AI Agent Says: */}
            <div className="text-lg sm:text-xl font-black text-slate-900 mt-2 tracking-tight">
              AI Agent Says:
            </div>

            {/* Descriptive Tier Title */}
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 tracking-tight px-2 leading-tight">
              {cleanLevelTitle}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 uppercase tracking-wider">
              Composite Score
            </p>
          </div>

          {/* Download Detailed Report & What to Fix Button */}
          {onDownloadReport && (
            <div className="mt-6 w-full pt-2">
              <button
                type="button"
                onClick={onDownloadReport}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#008752] hover:bg-[#007043] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <FileDown className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span className="leading-snug">Download Detailed Report &amp; What to Fix</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: The 5 Dials Attached (Next to Composite Score) */}
        <div className="flex-1 min-w-0 flex flex-col justify-between space-y-4">
          {/* Header replaced with requested title */}
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              What AI Agents Found About Your Website?
            </h4>
          </div>

          {/* Dials View matching image #2 */}
          {viewMode === 'dials' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
              {questionsList.map((q, idx) => {
                const qColor = getScoreColor(q.score);
                const r = 36;
                const circumference = 2 * Math.PI * r; // ~226.19
                const ringOffset = circumference * (1 - Math.min(100, Math.max(0, q.score)) / 100);
                const isSelected = selectedQuestionId === q.id;
                const weight = questionWeights[q.id] || '20%';

                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestionId(isSelected ? null : q.id)}
                    className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer text-center group ${
                      isSelected
                        ? 'border-[#008752] bg-emerald-50/40 ring-2 ring-[#008752]/30 shadow-md'
                        : 'border-slate-200 hover:border-[#008752]/50 hover:bg-slate-50/70 bg-white shadow-3xs hover:shadow-2xs'
                    }`}
                  >
                    {/* Top Row: circle number on left, question icon in soft green box on right */}
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center border border-slate-200">
                        {idx + 1}
                      </span>
                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/90 text-[#008752] shadow-3xs flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-[#008752]" />
                      </div>
                    </div>

                    {/* Question Title on top of the dial */}
                    <h5 className="mt-1 mb-2 text-xs sm:text-[13px] font-extrabold text-slate-900 leading-snug tracking-tight min-h-[46px] flex items-center justify-center px-1 text-center">
                      {q.question}
                    </h5>

                    {/* Circular Progress Dial */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto my-1 flex items-center justify-center">
                      <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
                        {/* Background track circle */}
                        <circle
                          cx="44"
                          cy="44"
                          r={r}
                          fill="none"
                          stroke="#EFE8DE"
                          strokeWidth="7"
                        />
                        {/* Active progress arc */}
                        <circle
                          cx="44"
                          cy="44"
                          r={r}
                          fill="none"
                          stroke={qColor.stroke}
                          strokeWidth="7"
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
                        <span className={`text-2xl sm:text-3xl font-black font-mono leading-none ${qColor.text}`}>
                          {q.score}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-400 font-mono font-bold leading-none mt-1 inline-flex items-baseline">
                          <span className="text-slate-400 font-light italic mr-0.5 opacity-80">/</span>
                          <span>100</span>
                        </span>
                      </div>
                    </div>

                    {/* Status Pill Badge */}
                    <div className="my-1">
                      <span
                        className={`inline-block text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${qColor.lightBg} ${qColor.text} border ${qColor.border} shadow-3xs`}
                      >
                        {q.status}
                      </span>
                    </div>

                    {/* Weight Applied to Composite Score */}
                    <div className="my-1">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200/90 rounded-md px-2 py-0.5 inline-flex items-center gap-1 shadow-3xs">
                        <span className="text-slate-500 font-sans font-semibold">Weight:</span>
                        <span className="text-[#008752] font-black">{weight}</span>
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-[11px] sm:text-xs text-slate-600 font-normal mt-2 leading-relaxed min-h-[50px] line-clamp-4">
                      {q.summary}
                    </p>

                    {/* View Factors Expand Toggle */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-xs text-[#008752] font-bold group-hover:text-[#007043]">
                      <span>{isSelected ? 'Hide Factors' : 'View Factors'}</span>
                      {isSelected ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Bar Charts View Alternative */
            <div className="space-y-3">
              {questionsList.map((q, idx) => {
                const qColor = getScoreColor(q.score);
                const isSelected = selectedQuestionId === q.id;
                const weight = questionWeights[q.id] || '20%';

                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestionId(isSelected ? null : q.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#008752] bg-emerald-50/30 shadow-sm'
                        : 'border-slate-200 hover:border-[#008752]/40 bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center border border-slate-200">
                          {idx + 1}
                        </span>
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">
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
                        <span className="font-mono font-bold text-sm text-slate-900 w-14 text-right">
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

          {/* Expanded Factor Drivers Panel */}
          {selectedQuestion && (
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/90 shadow-2xs space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#008752]" />
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    Factor Drivers for: <strong className="text-[#008752]">{selectedQuestion.question}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-600 bg-white border border-slate-200 rounded px-2 py-0.5 font-bold">
                    Weight: {questionWeights[selectedQuestion.id] || '20%'}
                  </span>
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
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {selectedQuestion.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                {selectedQuestion.keyFactors.map((factor, i) => (
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
      </div>
    </div>
  );
};
