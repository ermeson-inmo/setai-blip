import { useState } from "react";

const data = {
  gaps: [
    {
      title: "Formulário de contato inoperante",
      severity: "critical",
      detail: "A página de contato do site exibe a instrução para preencher os campos, mas nenhum campo carrega em mobile ou desktop. Todo lead que tenta contato pelo site é bloqueado silenciosamente.",
      impact: "100% dos leads via formulário se perdem antes de qualquer interação.",
      icon: "⚠️",
    },
    {
      title: "WhatsApp sem API Oficial e sem automação",
      severity: "critical",
      detail: "O canal de WhatsApp opera como WhatsApp Business comum, sem API oficial Meta, sem qualificação automática e sem atendimento fora do expediente. Leads gerados por campanhas ficam sem resposta até o próximo dia útil.",
      impact: "Leads de maior intenção — noite, fim de semana, pós-evento — são perdidos sistematicamente.",
      icon: "📵",
    },
    {
      title: "Sem rastreabilidade de campanhas Meta",
      severity: "high",
      detail: "Sem Click Tracker integrado ao WhatsApp, não há como saber qual anúncio no Instagram ou Facebook gerou qual conversa, qual lead qualificou e qual virou visita. O ROAS das campanhas é invisível.",
      impact: "Decisões de mídia tomadas sem metade dos dados reais do funil.",
      icon: "📍",
    },
    {
      title: "Três linhas, um canal sem segmentação",
      severity: "high",
      detail: "Setai luxo, Heritage médio-alto e Reserve MCMV atendem públicos completamente diferentes. Um único número sem roteamento inteligente não consegue qualificar e direcionar leads por linha ou empreendimento.",
      impact: "Experiência de atendimento genérica para um produto premium.",
      icon: "🔀",
    },
    {
      title: "Expansão para Recife e Natal sem estrutura conversacional",
      severity: "medium",
      detail: "Operar em novas praças sem canal conversacional estruturado replica o problema atual em mais cidades, com equipes desconectadas e sem visibilidade central.",
      impact: "Escala do problema atual multiplicada por novas praças.",
      icon: "🗺️",
    },
    {
      title: "Sem campanhas ativas pós-evento",
      severity: "medium",
      detail: "Comunicação de lançamentos ainda reativa. Sem régua de disparo segmentado para a base de leads captada em eventos presenciais do Grupo GP.",
      impact: "Investimento em evento sem aproveitamento da base gerada.",
      icon: "📣",
    },
  ],
  useCases: [
    {
      id: 1, title: "Click Tracker — ROAS Real das Campanhas", category: "Marketing",
      desc: "Cada anúncio Meta rastreado até a conversa no WhatsApp, a visita agendada e a proposta gerada. ROAS mensurável por empreendimento e por linha: Setai, Heritage ou Reserve.",
      kpi: "ROAS mensurável por campanha", gain: "Otimização de mídia baseada em dado real",
      forMarketing: true,
    },
    {
      id: 2, title: "IA Conversacional — Atendimento 24/7", category: "Captação",
      desc: "Agente de IA treinado com o portfólio Setai: plantas, metragens, preços e condições. Qualifica leads automaticamente por linha e empreendimento, responde fora do expediente e agenda visitas.",
      kpi: "Zero lead perdido fora do horário", gain: "Conversão +40% (ref. Direcional Engenharia)",
      forMarketing: false,
    },
    {
      id: 3, title: "Campanhas Ativas — Lançamentos e Eventos", category: "Marketing",
      desc: "Disparo ativo segmentado para base de leads no momento do lançamento. Vídeos do empreendimento, plantas e CTA para visita. Nutrição dos leads captados em eventos presenciais do Grupo GP.",
      kpi: "Taxa de abertura ~98% vs 20% e-mail", gain: "CAC reduzido por lançamento",
      forMarketing: true,
    },
    {
      id: 4, title: "Roteamento Inteligente por Linha", category: "Atendimento",
      desc: "Um único número com roteamento automático: o lead que pergunta sobre Setai luxo vai para o time Setai. Heritage para Heritage. Reserve para Reserve. Experiência personalizada por produto.",
      kpi: "Atendimento segmentado por linha", gain: "Experiência premium preservada",
      forMarketing: false,
    },
    {
      id: 5, title: "Blip Go Personal — Corretores Parceiros", category: "Comercial",
      desc: "WhatsApp individual para cada corretor parceiro com governança central. Histórico, métricas e qualidade de atendimento visíveis para o gestor. Rastreabilidade total da rede comercial.",
      kpi: "100% das conversas rastreadas", gain: "Produtividade +35%",
      forMarketing: false,
    },
    {
      id: 6, title: "Pós-venda e Evolução de Obra", category: "Relacionamento",
      desc: "Notificações automáticas de evolução de obra, documentos, boletos e NPS via WhatsApp. Cliente informado distrata menos. Redução de chamados repetitivos e melhora de satisfação.",
      kpi: "Distratos -25%, satisfação +30%", gain: "Preservação de receita em carteira",
      forMarketing: false,
    },
  ],
  roi: {
    gains: [
      { item: "Otimização de mídia com ROAS real por campanha", value: "Ganho significativo", basis: "Eliminação de campanhas sem retorno mensurável" },
      { item: "Aumento de conversão via IA 24/7 e Click Tracker", value: "Alta alavancagem", basis: "Referência Direcional Engenharia: +60% de conversão no canal" },
      { item: "Redução de CAC em lançamentos com campanhas ativas", value: "Ganho recorrente", basis: "Menor custo por lead qualificado via WhatsApp" },
      { item: "Retenção pós-venda — redução de distratos", value: "Receita preservada", basis: "Cliente informado distrata menos" },
    ],
  },
  roadmap: [
    { phase: "Fase 1", period: "Mês 1–2", title: "API Oficial + IA Conversacional", items: ["Ativação WhatsApp Business API Meta", "IA treinada com portfólio Setai, Heritage e Reserve", "Roteamento automático por linha de produto"], color: "purple" },
    { phase: "Fase 2", period: "Mês 2–3", title: "Click Tracker + Campanhas", items: ["Integração Click Tracker com Meta Ads", "Campanhas ativas para próximo lançamento", "Dashboard de resultados por empreendimento"], color: "blue" },
    { phase: "Fase 3", period: "Mês 3–5", title: "Corretores + Expansão", items: ["Blip Go Personal para rede de corretores", "Estrutura replicada para Recife e Natal", "Analytics de performance centralizada"], color: "purple" },
    { phase: "Fase 4", period: "Mês 5–6", title: "Pós-venda + Integrações", items: ["Notificações automáticas de obra", "Integração Portal do Cliente", "NPS e satisfação pós-contrato"], color: "blue" },
  ],
  caseRef: {
    results: [
      "85% dos atendimentos convertidos em oportunidades",
      "Taxa de conversão do canal aumentou até 60%",
      "Volume na Blip superou a central telefônica",
      "ROAS mensurável por campanha após implementação",
    ],
  },
};

const P = {
  purple: "#711cca",
  purpleLight: "#f3e8ff",
  purpleDark: "#4a0d8a",
  purpleMid: "#9b4dde",
  blue: "#0052CC",
  blueDark: "#003580",
  blueLight: "#e8f0ff",
  white: "#ffffff",
  offWhite: "#f8f9fa",
  dark: "#1a1a2e",
  gray: "#64748b",
  grayLight: "#e2e8f0",
  green: "#16a34a",
  red: "#dc2626",
  orange: "#ea580c",
};

const navItems = ["Diagnóstico", "Casos de Uso", "Retorno Esperado", "Roadmap", "Referência"];

export default function App() {
  const [tab, setTab] = useState(0);
  const tabs = [<GapsTab />, <CasosTab />, <ROITab />, <RoadmapTab />, <CaseTab />];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: P.offWhite, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${P.purpleDark} 0%, ${P.purple} 60%, ${P.blue} 100%)`,
        color: P.white, padding: "0 2rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, paddingBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, border: "1px solid rgba(255,255,255,0.25)",
              }}>💬</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.3 }}>
                  Plano Conversacional <span style={{ opacity: 0.8 }}>×</span> Setai Grupo GP
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                  Preparado pela Inmo · Parceira oficial Blip · Maio 2026
                </div>
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 20, padding: "5px 14px",
              fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
            }}>
              DIAGNÓSTICO PERSONALIZADO
            </div>
          </div>
          <div style={{ display: "flex", gap: 2, overflowX: "auto" }}>
            {navItems.map((item, i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                background: tab === i ? "rgba(255,255,255,0.2)" : "transparent",
                color: P.white,
                border: "none",
                borderBottom: tab === i ? "2px solid white" : "2px solid transparent",
                padding: "10px 18px", cursor: "pointer",
                fontSize: 13, fontWeight: tab === i ? 700 : 400,
                whiteSpace: "nowrap", transition: "all 0.2s", opacity: tab === i ? 1 : 0.7,
              }}>{item}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {tabs[tab]}
      </div>
    </div>
  );
}

// ─── DIAGNÓSTICO ─────────────────────────────────────────────────────────────
function GapsTab() {
  return (
    <div>
      <SH icon="🔍" title="Diagnóstico da Jornada Digital" sub="Análise feita percorrendo o site e os canais do Setai Grupo GP como cliente em potencial" />
      <div style={{
        background: `linear-gradient(135deg, ${P.purpleLight}, ${P.blueLight})`,
        border: `1px solid ${P.purple}33`,
        borderRadius: 10, padding: "14px 18px", marginBottom: 20,
        fontSize: 13, color: P.dark, lineHeight: 1.6,
      }}>
        Antes de qualquer contato, simulamos a jornada completa de um cliente interessado em um empreendimento do Setai Grupo GP — em mobile e desktop. Os pontos abaixo foram identificados nessa análise e representam oportunidades concretas de melhoria na captação e no aproveitamento de leads.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {data.gaps.map((g, i) => {
          const borderColor = g.severity === "critical" ? P.red : g.severity === "high" ? P.orange : P.gray;
          const badgeBg = g.severity === "critical" ? "#fee2e2" : g.severity === "high" ? "#ffedd5" : "#f1f5f9";
          const badgeColor = g.severity === "critical" ? P.red : g.severity === "high" ? P.orange : P.gray;
          const badgeLabel = g.severity === "critical" ? "CRÍTICO" : g.severity === "high" ? "ALTO" : "MÉDIO";
          return (
            <Card key={i} style={{ borderLeft: `3px solid ${borderColor}` }}>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>{g.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: P.dark }}>{g.title}</span>
                    <span style={{ background: badgeBg, color: badgeColor, borderRadius: 3, padding: "2px 8px", fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>{badgeLabel}</span>
                  </div>
                  <p style={{ fontSize: 12, color: P.gray, lineHeight: 1.6, margin: "0 0 10px" }}>{g.detail}</p>
                  <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 6, padding: "6px 10px" }}>
                    <span style={{ fontSize: 10, color: P.red, fontWeight: 700 }}>IMPACTO: </span>
                    <span style={{ fontSize: 11, color: P.dark }}>{g.impact}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── CASOS DE USO ─────────────────────────────────────────────────────────────
function CasosTab() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "mkt" ? data.useCases.filter(u => u.forMarketing) : data.useCases;

  return (
    <div>
      <SH icon="⚙️" title="Como a Blip Atua no Setai" sub="Casos de uso estratégicos para a operação do Grupo GP" />
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["all", "Todas as frentes"], ["mkt", "✦ Foco em Marketing"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            background: filter === val ? P.purple : P.white,
            color: filter === val ? P.white : P.gray,
            border: `1.5px solid ${filter === val ? P.purple : P.grayLight}`,
            borderRadius: 20, padding: "7px 18px", cursor: "pointer",
            fontSize: 12, fontWeight: filter === val ? 700 : 400,
            transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {filtered.map((uc, i) => (
          <Card key={i} style={{ borderTop: `3px solid ${uc.forMarketing ? P.purple : P.blue}` }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{
                background: uc.forMarketing ? P.purpleLight : P.blueLight,
                color: uc.forMarketing ? P.purple : P.blue,
                borderRadius: 4, padding: "3px 10px",
                fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
              }}>{uc.category}</span>
              {uc.forMarketing && (
                <span style={{ background: P.purpleLight, color: P.purple, borderRadius: 4, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>✦ Marketing</span>
              )}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: P.dark, marginBottom: 8 }}>{uc.title}</div>
            <p style={{ fontSize: 12, color: P.gray, lineHeight: 1.6, margin: "0 0 14px" }}>{uc.desc}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: P.purpleLight, borderRadius: 6, padding: "8px 10px" }}>
                <div style={{ fontSize: 9, color: P.gray, marginBottom: 2, fontWeight: 600, letterSpacing: 0.5 }}>KPI</div>
                <div style={{ fontSize: 11, color: P.purple, fontWeight: 700 }}>{uc.kpi}</div>
              </div>
              <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 6, padding: "8px 10px" }}>
                <div style={{ fontSize: 9, color: P.gray, marginBottom: 2, fontWeight: 600, letterSpacing: 0.5 }}>GANHO</div>
                <div style={{ fontSize: 11, color: P.green, fontWeight: 700 }}>{uc.gain}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── ROI ─────────────────────────────────────────────────────────────────────
function ROITab() {
  return (
    <div>
      <SH icon="📈" title="Retorno Esperado" sub="Fontes de ganho identificadas para a operação do Setai Grupo GP" />
      <div style={{ marginBottom: 18, background: `linear-gradient(135deg, ${P.purple}, ${P.blue})`, borderRadius: 12, padding: "24px 28px", color: P.white }}>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>
          O retorno com a Blip não vem de uma única frente. Ele se acumula em quatro áreas simultâneas da operação do Setai.
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 8 }}>
          {["Mídia mais eficiente", "Mais leads convertidos", "CAC menor", "Menos distratos"].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13 }}>
              <span style={{ color: P.purpleLight, fontWeight: 700 }}>✓</span>
              <span style={{ opacity: 0.9 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        {data.roi.gains.map((g, i) => (
          <Card key={i}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg, ${P.purple}, ${P.blue})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: P.white, fontWeight: 800,
              }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: P.dark, marginBottom: 4 }}>{g.item}</div>
                <div style={{ fontSize: 11, color: P.gray, marginBottom: 8 }}>{g.basis}</div>
                <span style={{
                  background: P.purpleLight, color: P.purple,
                  borderRadius: 20, padding: "4px 12px",
                  fontSize: 11, fontWeight: 700,
                }}>{g.value}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ background: `linear-gradient(135deg, ${P.purpleLight}, ${P.blueLight})`, border: `1px solid ${P.purple}33` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: P.dark, marginBottom: 8 }}>
          Por que o ROI da Blip é consistente no imobiliário
        </div>
        <p style={{ fontSize: 12, color: P.gray, lineHeight: 1.7, margin: 0 }}>
          O ticket médio de um imóvel torna qualquer melhoria de conversão altamente significativa. Um único lead qualificado a mais por semana, que no modelo atual seria perdido fora do expediente, representa um impacto financeiro que justifica amplamente o investimento em plataforma. Somado à rastreabilidade de mídia e à redução de distratos, o retorno se torna recorrente e previsível.
        </p>
      </Card>
    </div>
  );
}

// ─── ROADMAP ─────────────────────────────────────────────────────────────────
function RoadmapTab() {
  return (
    <div>
      <SH icon="🗓️" title="Plano de Implementação" sub="4 fases em 6 meses — da ativação inicial ao pós-venda automatizado" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {data.roadmap.map((phase, i) => {
          const color = phase.color === "purple" ? P.purple : P.blue;
          const colorLight = phase.color === "purple" ? P.purpleLight : P.blueLight;
          return (
            <Card key={i} style={{ borderTop: `3px solid ${color}` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ background: color, color: P.white, borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{phase.phase}</div>
                <div style={{ fontSize: 11, color: P.gray }}>{phase.period}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, color: P.dark, marginBottom: 10 }}>{phase.title}</div>
              {phase.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color, fontWeight: 700 }}>→</span>
                  <span style={{ color: P.dark }}>{item}</span>
                </div>
              ))}
            </Card>
          );
        })}
      </div>
      <Card style={{ background: P.offWhite, border: `1.5px solid ${P.purple}33` }}>
        <div style={{ fontSize: 12, color: P.purple, fontWeight: 700, marginBottom: 8 }}>Diferenciais da implementação</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Número atual mantido", "Roteamento por linha Setai / Heritage / Reserve", "Escalável para Recife e Natal", "Onboarding acompanhado pela Inmo", "BSP Oficial Meta"].map((t, i) => (
            <span key={i} style={{ background: P.purpleLight, color: P.purple, border: `1px solid ${P.purple}33`, borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── CASE ────────────────────────────────────────────────────────────────────
function CaseTab() {
  return (
    <div>
      <SH icon="🏆" title="Case de Referência" sub="Direcional Engenharia + Blip — mesmo ponto de partida que o Setai" />
      <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${P.purpleDark}, ${P.blueDark})`, color: P.white }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
          A Direcional Engenharia partiu de uma situação semelhante à do Setai: WhatsApp sem automação e campanhas Meta sem rastreabilidade. Após implementar Contato Inteligente com IA e Click Tracker via Blip:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {data.caseRef.results.map((r, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.15)" }}>
              <span style={{ fontSize: 16, marginRight: 6 }}>✓</span>
              <span style={{ fontSize: 12 }}>{r}</span>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          ["BSP Oficial Meta", "Número verificado, sem risco de bloqueio, com selo de empresa aprovado pela Meta.", "🔒"],
          ["Click Tracker exclusivo", "Única solução que rastreia cada anúncio Meta até a conversa, a visita e a proposta.", "📍"],
          ["IA treinada por portfólio", "Agente que conhece Setai, Heritage e Reserve separadamente, com suas plantas e condições.", "🤖"],
          ["Blip Go Personal", "WhatsApp individual por corretor com histórico e governança centralizada para o gestor.", "👤"],
          ["Escalável para novas praças", "Recife e Natal com a mesma estrutura centralizada e analytics unificados.", "🗺️"],
          ["Parceiro especializado", "A Inmo tem implementações em construtoras com integração a SIENGE e Construtor de Vendas.", "🏗️"],
        ].map(([title, desc, icon], i) => (
          <Card key={i}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: P.dark, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: P.gray, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── SHARED ──────────────────────────────────────────────────────────────────
function SH({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: 21, color: P.dark, fontWeight: 800 }}>{title}</h2>
      </div>
      <p style={{ margin: 0, color: P.gray, fontSize: 13, paddingLeft: 32 }}>{sub}</p>
      <div style={{ height: 2, background: `linear-gradient(90deg, ${P.purple}, ${P.blue}, transparent)`, marginTop: 12, marginLeft: 32 }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#ffffff", borderRadius: 10, padding: "16px 18px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      border: "1px solid #e2e8f0",
      ...style,
    }}>{children}</div>
  );
}
