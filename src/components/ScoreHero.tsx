import React, { useState } from 'react';
import { AuditReport } from '../types/audit';
import { ScoreGaugeDial } from './ScoreGaugeDial';
import { DownloadReportModal } from './DownloadReportModal';

interface ScoreHeroProps {
  report: AuditReport;
}

export const ScoreHero: React.FC<ScoreHeroProps> = ({ report }) => {
  const { composite, domain } = report;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Primary Speedometer Dial & 5 Category Breakdown Dials */}
      <div className="relative">
        <ScoreGaugeDial
          score={composite.compositeScore}
          domain={domain}
          businessName={report.businessName}
          dialBreakdown={composite.dialBreakdown}
          questionsBreakdown={composite.questionsBreakdown}
          tools={composite.tools}
          onDownloadReport={() => setIsModalOpen(true)}
        />
      </div>

      {/* Pop box modal for user details & 3-page PDF download */}
      <DownloadReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        report={report}
      />
    </div>
  );
};
