interface Finding {
  text?: string
  details?: string
  issue?: string
  severity?: string
  evidence?: string
  impact?: string
  fix?: string
}

interface AuditReportProps {
  audit: {
    report_tier: string
    tech_findings: Finding[] | null
    content_findings: Finding[] | null
    findings: Finding[] | null
    performance_metrics: {
      overall_score?: number
      critical_count?: number
      high_count?: number
      medium_count?: number
      total_findings?: number
    } | null
  }
}

const severityColors: Record<string, string> = {
  critical: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950/30 dark:text-red-200 dark:border-red-900",
  high: "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950/30 dark:text-orange-200 dark:border-orange-900",
  medium: "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-200 dark:border-yellow-900",
}

function FindingCard({ finding, index }: { finding: Finding; index: number }) {
  const title = finding.issue || finding.text || `Finding #${index + 1}`
  const severity = finding.severity || "medium"
  
  return (
    <article className={`rounded-2xl border p-6 ${severityColors[severity] || severityColors.medium}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider">
          {severity}
        </span>
        <span className="text-xs text-muted-foreground">#{index + 1}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {finding.evidence && (
        <p className="text-sm mb-2"><strong>Evidence:</strong> {finding.evidence}</p>
      )}
      {finding.impact && (
        <p className="text-sm mb-2"><strong>Impact:</strong> {finding.impact}</p>
      )}
      {finding.fix && (
        <p className="text-sm"><strong>Fix:</strong> {finding.fix}</p>
      )}
      {!finding.evidence && !finding.impact && !finding.fix && finding.details && (
        <p className="text-sm whitespace-pre-wrap">{finding.details}</p>
      )}
    </article>
  )
}

export function AuditReport({ audit }: AuditReportProps) {
  const techFindings = audit.tech_findings || []
  const contentFindings = audit.content_findings || []
  const metrics = audit.performance_metrics

  return (
    <div className="space-y-12">
      {/* Score card (только для платных тиров) */}
      {metrics?.overall_score !== undefined && (
        <div className="rounded-3xl border border-border/60 bg-card p-8">
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{metrics.overall_score}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Overall</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500">{metrics.critical_count || 0}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">{metrics.high_count || 0}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">High</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">{metrics.medium_count || 0}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Medium</div>
            </div>
          </div>
        </div>
      )}

      {/* Tech findings */}
      {techFindings.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Technical Issues</h2>
          <div className="space-y-4">
            {techFindings.map((f, i) => (
              <FindingCard key={`tech-${i}`} finding={f} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Content findings */}
      {contentFindings.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Content Issues</h2>
          <div className="space-y-4">
            {contentFindings.map((f, i) => (
              <FindingCard key={`content-${i}`} finding={f} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Если нет специфических полей — показываем общий findings массив */}
      {techFindings.length === 0 && contentFindings.length === 0 && audit.findings && audit.findings.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Findings</h2>
          <div className="space-y-4">
            {audit.findings.map((f, i) => (
              <FindingCard key={`f-${i}`} finding={f} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
