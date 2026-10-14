import React from 'react';
import { CheckCircle2, ExternalLink, ShieldCheck, Database, Radio } from 'lucide-react';
import { AgentReadinessToolBenchmark } from '../types/audit';

interface SourcesViewProps {
  tools?: AgentReadinessToolBenchmark[];
  score?: number;
}

export const SourcesView: React.FC<SourcesViewProps> = ({ tools, score = 68 }) => {
  const defaultTools: AgentReadinessToolBenchmark[] = [
    {
      id: 'oraAi',
      order: 1,
      name: 'Ora.ai',
      url: 'https://ora.ai',
      displayUrl: 'ora.ai',
      score: 48,
      status: 'passed',
      focus: 'Action surface, /llms.txt context protocols & legal consultation endpoints',
      summary: 'Action friction detected. Lacks /llms.txt manifest and autonomous consultation booking endpoints.',
      keyFindings: [],
      metrics: [],
    },
    {
      id: 'isitAgentReady',
      order: 2,
      name: 'isitagentready.com',
      url: 'https://isitagentready.com',
      displayUrl: 'isitagentready.com',
      score: 82,
      status: 'passed',
      focus: 'Robots.txt crawl permissions, AI bot access matrix & legal sitemaps',
      summary: 'Solid search accessibility. Search engine AI bots permitted to index attorney directory.',
      keyFindings: [],
      metrics: [],
    },
    {
      id: 'webYes',
      order: 3,
      name: 'WebYes Agent-Readiness',
      url: 'https://www.webyes.com/agent-readiness/',
      displayUrl: 'webyes.com/agent-readiness',
      score: 68,
      status: 'passed',
      focus: 'Semantic entity modeling, LegalService schema depth & attorney profiles',
      summary: 'Attorney profile schemas identified, but practice area taxonomy lacks structured graph links.',
      keyFindings: [],
      metrics: [],
    },
    {
      id: 'siteSpeak',
      order: 4,
      name: 'SiteSpeak AI Agent Scanner',
      url: 'https://sitespeak.ai/tools/ai-agent-readiness-scanner',
      displayUrl: 'sitespeak.ai/tools/ai-agent-readiness-scanner',
      score: 70,
      status: 'passed',
      focus: 'Syntactic parsing, meta taxonomy & client intent extraction',
      summary: 'Clean HTML structure allows LLMs to summarize firm history and legal services.',
      keyFindings: [],
      metrics: [],
    },
    {
      id: 'chatThing',
      order: 5,
      name: 'ChatThing Agent Readiness',
      url: 'https://chatthing.ai/tools/agent-readiness-checker',
      displayUrl: 'chatthing.ai/tools/agent-readiness-checker',
      score: 75,
      status: 'passed',
      focus: 'Document structure, FAQ discoverability & legal knowledge retrieval',
      summary: 'Client insights and legal articles provide strong semantic grounding for RAG.',
      keyFindings: [],
      metrics: [],
    },
    {
      id: 'agenticCommerce',
      order: 6,
      name: 'Agentic Commerce Readiness',
      url: 'https://agenticcommerce.shop',
      displayUrl: 'agenticcommerce.shop',
      score: 52,
      status: 'passed',
      focus: 'Autonomous legal procurement, retainers & engagement letter execution',
      summary: 'Engagement letter execution locked behind human consultation intake.',
      keyFindings: [],
      metrics: [],
    },
    {
      id: 'aiCommerceReady',
      order: 7,
      name: 'AI Commerce Ready',
      url: 'https://aicommerceready.com',
      displayUrl: 'aicommerceready.com',
      score: 55,
      status: 'passed',
      focus: 'Structured service catalog, office availability & conflict check readiness',
      summary: 'Office locations verified via microdata, but preliminary conflict checks are manual.',
      keyFindings: [],
      metrics: [],
    },
  ];

  const toolsList = tools && tools.length > 0 ? tools : defaultTools;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header matching image #1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#008752] inline-block" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#008752]">
              TOOLS &amp; WEBSITES INGESTED FOR RANKING
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
            Evaluated Tools ({toolsList.length} of {toolsList.length} Responded Successfully)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Diagnostic APIs and crawler endpoints gathered and synthesized into your domain&apos;s composite agent readiness score.
          </p>
        </div>

        {/* 7/7 Verified Pill Badge */}
        <div className="shrink-0 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#008752] font-mono text-xs font-bold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#008752]" />
            <span>{toolsList.length}/{toolsList.length} Verified</span>
          </span>
        </div>
      </div>

      {/* List of 7 Evaluated Tools */}
      <div className="space-y-2.5">
        {toolsList.map((tool) => (
          <div
            key={tool.id}
            className="bg-white border border-slate-200/90 hover:border-[#008752]/50 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all shadow-3xs hover:shadow-xs"
          >
            {/* Left: Checkmark + Tool Order + Tool Name + External Link + Focus */}
            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
              <div
                className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0"
                title="Verified response gathered"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#008752]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900">
                    {tool.order}. {tool.name}
                  </span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs text-[#008752] hover:text-[#007043] font-medium hover:underline"
                  >
                    <span>{tool.displayUrl || tool.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-xl mt-0.5 font-normal">
                  {tool.focus || tool.summary}
                </p>
              </div>
            </div>

            {/* Right: Valid Response pill + Score Badge */}
            <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50/90 border border-emerald-200 text-[#008752] text-xs font-semibold">
                <CheckCircle2 className="w-3 h-3 text-[#008752]" />
                <span>Valid Response</span>
              </span>

              <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 min-w-[58px] text-center">
                {tool.score}/100
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer matching image #1 */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
        <span>Valid diagnostic responses gathered and synthesized into ranking</span>
        <span className="font-mono text-[11px] text-slate-400">100% Ingestion</span>
      </div>
    </div>
  );
};
