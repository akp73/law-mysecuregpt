import React from 'react';
import { BarChart3 } from 'lucide-react';
import { IndustryBenchmark } from '../types/audit';

interface IndustryBenchmarkViewProps {
  benchmark: IndustryBenchmark;
  availableIndustries?: { id: string; name: string; defaultMedian: number; top10: number }[];
  onSelectIndustry?: (industryId: string) => void;
  isLoading?: boolean;
  selectedIndustry?: string;
}

export const IndustryBenchmarkView: React.FC<IndustryBenchmarkViewProps> = ({
  benchmark,
}) => {
  const { industryName, peerCohort } = benchmark;

  return (
    <div className="space-y-6">
      {/* Header: Competitive Benchmark */}
      <div className="pb-2 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Competitive Benchmark
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#008752] border border-emerald-200">
          Law Practice &amp; Legal Services Benchmark
        </span>
      </div>

      {/* Competitor Comparison Leaderboard Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#008752]" />
            <span className="font-bold text-sm text-slate-900">{industryName} Competitor Leaderboard</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {peerCohort.length} Audited Law Firms
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 border-b border-slate-200 font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Law Firm / Domain</th>
                <th className="py-3 px-4">Composite Score</th>
                <th className="py-3 px-4">Robots.txt</th>
                <th className="py-3 px-4">Schema.org</th>
                <th className="py-3 px-4">Actionability</th>
                <th className="py-3 px-4">Key Agent Advantage / Limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {peerCohort.map((company, idx) => {
                const isTarget = !!company.isTarget;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isTarget
                        ? 'bg-emerald-50/70 text-slate-900 font-semibold border-l-4 border-l-[#008752]'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${
                        company.rank === 1
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 font-black'
                          : company.rank === 2
                          ? 'bg-slate-200 text-slate-700 border border-slate-300'
                          : company.rank === 3
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'text-slate-500'
                      }`}>
                        #{company.rank}
                      </span>
                    </td>

                    {/* Company Name & Domain */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{company.name}</span>
                        {isTarget && (
                          <span className="text-[10px] font-mono text-white bg-[#008752] px-1.5 py-0.5 rounded font-bold">
                            AUDITED DOMAIN
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-slate-500 mt-0.5">{company.domain}</div>
                    </td>

                    {/* Composite Score & Grade */}
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          company.compositeScore >= 80 ? 'text-[#008752]' :
                          company.compositeScore >= 60 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {company.compositeScore}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                          {company.grade}
                        </span>
                      </div>
                    </td>

                    {/* Robots.txt Score */}
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {company.robotsTxtScore}%
                    </td>

                    {/* Schema Score */}
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {company.schemaScore}%
                    </td>

                    {/* Actionability Score */}
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {company.actionabilityScore}%
                    </td>

                    {/* Key Advantage / Flaw */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs leading-relaxed text-[11px]">
                      {company.keyAdvantageOrFlaw}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
