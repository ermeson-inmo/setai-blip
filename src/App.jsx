import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

// ─── PALETA ──────────────────────────────────────────────────────────────────
const P = {
  purple: "#711cca", purpleLight: "#f3e8ff", purpleDark: "#4a0d8a",
  purpleMid: "#9b4dde", blue: "#0052CC", blueDark: "#003580",
  blueLight: "#e8f0ff", white: "#ffffff", offWhite: "#f8f9fa",
  dark: "#1a1a2e", gray: "#64748b", grayLight: "#e2e8f0",
  green: "#16a34a", red: "#dc2626", orange: "#ea580c",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const gaps = [
  { title: "Formulário de contato inoperante", severity: "critical", detail: "A página de contato do site exibe a instrução para preencher os campos, mas nenhum campo carrega em mobile ou desktop. Todo lead que tenta contato pelo site é bloqueado silenciosamente.", impact: "100% dos leads via formulário se perdem antes de qualquer interação.", icon: "⚠️" },
  { title: "WhatsApp sem API Oficial e sem automação", severity: "critical", detail: "O canal de WhatsApp opera como WhatsApp Business comum, sem API oficial Meta, sem qualificação automática e sem atendimento fora do expediente. Leads gerados por campanhas ficam sem resposta até o próximo dia útil.", impact: "Leads de maior intenção — noite, fim de semana, pós-evento — são perdidos sistematicamente.", icon: "📵" },
  { title: "Sem rastreabilidade de campanhas Meta", severity: "high", detail: "Sem Click Tracker integrado ao WhatsApp, não há como saber qual anúncio no Instagram ou Facebook gerou qual conversa, qual lead qualificou e qual virou visita. O ROAS das campanhas é invisível.", impact: "Decisões de mídia tomadas sem metade dos dados reais do funil.", icon: "📍" },
  { title: "Três linhas, um canal sem segmentação", severity: "high", detail: "Setai luxo, Heritage médio-alto e Reserve MCMV atendem públicos completamente diferentes. Um único número sem roteamento inteligente não consegue qualificar e direcionar leads por linha ou empreendimento.", impact: "Experiência de atendimento genérica para um produto premium.", icon: "🔀" },
  { title: "Expansão para Recife e Natal sem estrutura conversacional", severity: "medium", detail: "Operar em novas praças sem canal conversacional estruturado replica o problema atual em mais cidades, com equipes desconectadas e sem visibilidade central.", impact: "Escala do problema atual multiplicada por novas praças.", icon: "🗺️" },
  { title: "Sem campanhas ativas pós-evento", severity: "medium", detail: "Comunicação de lançamentos ainda reativa. Sem régua de disparo segmentado para a base de leads captada em eventos presenciais do Grupo GP.", impact: "Investimento em evento sem aproveitamento da base gerada.", icon: "📣" },
];

const useCases = [
  { id:1, title:"Click Tracker — ROAS Real", category:"Marketing", desc:"Cada anúncio Meta rastreado até a conversa no WhatsApp, a visita e a proposta. ROAS mensurável por empreendimento e por linha: Setai, Heritage ou Reserve.", kpi:"ROAS mensurável por campanha", gain:"Otimização de mídia baseada em dado real", forMarketing:true },
  { id:2, title:"IA Conversacional 24/7", category:"Captação", desc:"Agente de IA treinado com o portfólio Setai: plantas, metragens, preços e condições. Qualifica leads automaticamente por linha, responde fora do expediente e agenda visitas.", kpi:"Zero lead perdido fora do horário", gain:"Conversão +40% (ref. Direcional Engenharia)", forMarketing:false },
  { id:3, title:"Campanhas Ativas — Lançamentos", category:"Marketing", desc:"Disparo ativo segmentado para base de leads no lançamento. Vídeos do empreendimento, plantas e CTA para visita. Nutrição dos leads captados em eventos presenciais.", kpi:"Taxa de abertura ~98% vs 20% e-mail", gain:"CAC reduzido por lançamento", forMarketing:true },
  { id:4, title:"Roteamento por Linha de Produto", category:"Atendimento", desc:"Um número com roteamento automático: lead do Setai luxo vai para o time Setai. Heritage para Heritage. Reserve para Reserve. Experiência personalizada por produto.", kpi:"Atendimento segmentado por linha", gain:"Experiência premium preservada", forMarketing:false },
  { id:5, title:"Blip Go Personal — Corretores", category:"Comercial", desc:"WhatsApp individual para cada corretor parceiro com governança central. Histórico, métricas e qualidade de atendimento visíveis para o gestor.", kpi:"100% das conversas rastreadas", gain:"Produtividade +35%", forMarketing:false },
  { id:6, title:"Pós-venda e Evolução de Obra", category:"Relacionamento", desc:"Notificações automáticas de obra, documentos, boletos e NPS via WhatsApp. Cliente informado distrata menos. Redução de chamados e melhora de satisfação.", kpi:"Distratos -25%, satisfação +30%", gain:"Preservação de receita em carteira", forMarketing:false },
];

const roiGains = [
  { item:"Otimização de mídia com ROAS real", basis:"Eliminação de campanhas sem retorno mensurável. Mídia alocada com base em dado real de conversão." },
  { item:"Aumento de conversão via IA 24/7", basis:"Referência Direcional Engenharia: +60% de conversão. Leads de maior intenção aproveitados fora do expediente." },
  { item:"Redução de CAC em lançamentos", basis:"Menor custo por lead qualificado via campanhas ativas no WhatsApp comparado a outros canais." },
  { item:"Retenção pós-venda — redução de distratos", basis:"Cliente informado sobre a obra distrata menos. Preservação de receita já contratada em carteira." },
];

const roadmap = [
  { phase:"Fase 1", period:"Mês 1–2", title:"API Oficial + IA Conversacional", items:["Ativação WhatsApp Business API Meta","IA treinada: Setai, Heritage, Reserve","Roteamento automático por linha de produto"], color:"purple" },
  { phase:"Fase 2", period:"Mês 2–3", title:"Click Tracker + Campanhas", items:["Integração Click Tracker com Meta Ads","Campanhas ativas para próximo lançamento","Dashboard de resultados por empreendimento"], color:"blue" },
  { phase:"Fase 3", period:"Mês 3–5", title:"Corretores + Expansão", items:["Blip Go Personal para rede de corretores","Estrutura replicada para Recife e Natal","Analytics de performance centralizada"], color:"purple" },
  { phase:"Fase 4", period:"Mês 5–6", title:"Pós-venda + Integrações", items:["Notificações automáticas de obra","Integração Portal do Cliente","NPS e satisfação pós-contrato"], color:"blue" },
];

const caseResults = [
  "85% dos atendimentos convertidos em oportunidades",
  "Taxa de conversão do canal aumentou até 60%",
  "Volume na Blip superou a central telefônica",
  "ROAS mensurável por campanha após implementação",
];

const conversation = [
  { id:1, from:"bot", text:"Olá! 👋 Vi que você clicou no nosso anúncio do *Setai Residences* no Instagram. Seja bem-vindo!\n\nSou a assistente virtual do Setai Grupo GP. Posso te ajudar a conhecer o empreendimento e agendar uma visita.\n\nQual é o seu nome?", delay:800 },
  { id:2, from:"user", text:"Oi, sou a Ana Clara", delay:1800 },
  { id:3, from:"bot", text:"Prazer, Ana Clara! 😊\n\nO *Setai Residences Design by Pininfarina* é único no Brasil — assinado pela lendária design house italiana.\n\nVocê tem interesse em usar o imóvel para *morar* ou como *investimento*?", delay:3000 },
  { id:4, from:"user", text:"Investimento principalmente", delay:4200 },
  { id:5, from:"bot", text:"Ótima escolha! 📈 João Pessoa está entre as cidades com maior valorização imobiliária do Brasil.\n\nPara te apresentar as opções mais adequadas, me diz: você busca unidades a partir de qual faixa de valor?", delay:5400 },
  { id:6, from:"user", text:"A partir de R$ 1 milhão", delay:6800 },
  { id:7, from:"bot", text:"Perfeito! Temos opções ideais para esse perfil. 🏙️\n\nAs plantas disponíveis a partir dessa faixa:\n\n• *Tipo A* — 162m² · 3 suítes · 2 vagas\n• *Tipo B* — 189m² · 4 suítes · 3 vagas\n• *Cobertura* — 320m² · posições exclusivas\n\nQual desperta mais interesse?", delay:8000 },
  { id:8, from:"user", text:"O Tipo B parece interessante", delay:9400 },
  { id:9, from:"bot", text:"Excelente gosto! O Tipo B tem vista panorâmica privilegiada. 🌅\n\nPosso agendar uma visita ao nosso espaço de experiência para você ver a maquete e conversar com uma consultora.\n\nQual período funciona melhor?\n\n⬜ Esta semana\n⬜ Semana que vem\n⬜ Prefiro marcar por ligação", delay:10800 },
  { id:10, from:"user", text:"Esta semana", delay:12200 },
  { id:11, from:"bot", text:"📅 Tenho disponibilidade:\n\n• *Quarta* — 14h ou 17h\n• *Quinta* — 10h ou 16h\n• *Sexta* — 11h\n\nQual prefere?", delay:13400 },
  { id:12, from:"user", text:"Quinta às 16h", delay:14800 },
  { id:13, from:"bot", text:"✅ *Visita confirmada!*\n\n📅 Quinta-feira · 16h00\n📍 Espaço Setai — Altiplano, João Pessoa\n👤 Uma consultora estará te esperando\n\nVou te enviar o endereço exato por aqui. Até quinta, Ana Clara! 🏙️", delay:16200 },
];

const demoInsights = [
  { icon:"📍", title:"Click Tracker ativo", desc:"O clique de Ana Clara no anúncio foi registrado pela Inmo. O Setai sabe exatamente qual criativo gerou essa conversa, com rastreamento via plataforma Blip." },
  { icon:"🤖", title:"IA treinada pela Inmo", desc:"Sem humano envolvido. A Inmo treinou o agente com o portfólio do Setai — ele identifica o perfil investidor, filtra pela faixa de valor e apresenta as plantas certas." },
  { icon:"📅", title:"Visita agendada automaticamente", desc:"Da chegada no WhatsApp até a confirmação da visita — tudo na mesma conversa, orquestrado pela Inmo via plataforma Blip, sem intervenção humana." },
  { icon:"📊", title:"Lead registrado e rastreado", desc:"Após o agendamento, o lead entra no funil com origem, perfil e próxima ação registrados automaticamente. Visibilidade total para o time do Setai." },
];

// ─── NAV CONFIG ──────────────────────────────────────────────────────────────
const navItems = [
  { label:"Diagnóstico", icon:"🔍" },
  { label:"Casos de Uso", icon:"⚙️" },
  { label:"Retorno", icon:"📈" },
  { label:"Roadmap", icon:"🗓️" },
  { label:"Referência", icon:"🏆" },
  { label:"Demo", icon:"▶️" },
];

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const tabs = [<GapsTab/>, <CasosTab/>, <ROITab/>, <RoadmapTab/>, <CaseTab/>, <DemoTab/>];

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:P.offWhite, minHeight:"100vh" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-4px); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .tab-btn:active { transform: scale(0.95); }
        .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .phase-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ref-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 600px) {
          .card-grid { grid-template-columns: 1fr !important; }
          .phase-grid { grid-template-columns: 1fr !important; }
          .ref-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg, ${P.purpleDark} 0%, ${P.purple} 60%, ${P.blue} 100%)`, color:P.white }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"16px 16px 0" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:38, height:38, borderRadius:9, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>💬</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:800, fontSize:15, lineHeight:1.2 }}>Plano Conversacional · Setai Grupo GP</div>
              <div style={{ fontSize:11, opacity:0.7, marginTop:2 }}>Inmo · Parceira Blip · Maio 2026</div>
            </div>
          </div>

          {/* Tab grid — 3x2 no mobile, linha no desktop */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:4, paddingBottom:2 }}
            className="nav-grid">
            {navItems.map((item,i) => (
              <button key={i} onClick={() => setTab(i)} className="tab-btn" style={{
                background: tab===i ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)",
                color: P.white,
                border: tab===i ? "1.5px solid rgba(255,255,255,0.5)" : "1.5px solid rgba(255,255,255,0.12)",
                borderRadius:10, padding:"8px 4px",
                cursor:"pointer", fontSize:11,
                fontWeight: tab===i ? 700 : 400,
                transition:"all 0.15s", opacity: tab===i ? 1 : 0.75,
                display:"flex", flexDirection:"column", alignItems:"center", gap:3,
              }}>
                <span style={{ fontSize:16 }}>{item.icon}</span>
                <span style={{ lineHeight:1.2, textAlign:"center" }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"20px 14px 40px" }}>
        {tabs[tab]}
      </div>
      <Analytics />
    </div>
  );
}

// ─── DIAGNÓSTICO ─────────────────────────────────────────────────────────────
function GapsTab() {
  return (
    <div>
      <SH icon="🔍" title="Diagnóstico da Jornada Digital" sub="Análise feita percorrendo o site e os canais do Setai como cliente em potencial" />
      <div style={{ background:`linear-gradient(135deg,${P.purpleLight},${P.blueLight})`, border:`1px solid ${P.purple}33`, borderRadius:10, padding:"12px 14px", marginBottom:16, fontSize:12, color:P.dark, lineHeight:1.6 }}>
        Antes de qualquer contato, simulamos a jornada completa de um cliente interessado em um empreendimento — em mobile e desktop. Os pontos abaixo representam oportunidades concretas de melhoria na captação e aproveitamento de leads.
      </div>
      <div className="card-grid">
        {gaps.map((g,i) => {
          const bc = g.severity==="critical" ? P.red : g.severity==="high" ? P.orange : P.gray;
          const bb = g.severity==="critical" ? "#fee2e2" : g.severity==="high" ? "#ffedd5" : "#f1f5f9";
          const bl = g.severity==="critical" ? "CRÍTICO" : g.severity==="high" ? "ALTO" : "MÉDIO";
          return (
            <Card key={i} style={{ borderLeft:`3px solid ${bc}` }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6, flexWrap:"wrap" }}>
                <span style={{ fontSize:20 }}>{g.icon}</span>
                <span style={{ fontWeight:700, fontSize:12, color:P.dark, flex:1 }}>{g.title}</span>
                <span style={{ background:bb, color:bc, borderRadius:3, padding:"1px 7px", fontSize:9, fontWeight:700 }}>{bl}</span>
              </div>
              <p style={{ fontSize:11, color:P.gray, lineHeight:1.5, margin:"0 0 8px" }}>{g.detail}</p>
              <div style={{ background:"#fff1f2", border:"1px solid #fecdd3", borderRadius:6, padding:"5px 8px" }}>
                <span style={{ fontSize:10, color:P.red, fontWeight:700 }}>IMPACTO: </span>
                <span style={{ fontSize:10, color:P.dark }}>{g.impact}</span>
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
  const filtered = filter==="mkt" ? useCases.filter(u => u.forMarketing) : useCases;
  return (
    <div>
      <SH icon="⚙️" title="Como a Inmo Estrutura o Canal Conversacional" sub="O que a Inmo entrega para a operação do Setai, utilizando a plataforma Blip" />
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {[["all","Todas as frentes"],["mkt","✦ Foco em Marketing"]].map(([val,label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{ background:filter===val?P.purple:P.white, color:filter===val?P.white:P.gray, border:`1.5px solid ${filter===val?P.purple:P.grayLight}`, borderRadius:20, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:filter===val?700:400, transition:"all 0.2s" }}>{label}</button>
        ))}
      </div>
      <div className="card-grid">
        {filtered.map((uc,i) => (
          <Card key={i} style={{ borderTop:`3px solid ${uc.forMarketing?P.purple:P.blue}` }}>
            <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:8, flexWrap:"wrap" }}>
              <span style={{ background:uc.forMarketing?P.purpleLight:P.blueLight, color:uc.forMarketing?P.purple:P.blue, borderRadius:4, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{uc.category}</span>
              {uc.forMarketing && <span style={{ background:P.purpleLight, color:P.purple, borderRadius:4, padding:"2px 8px", fontSize:10, fontWeight:700 }}>✦ Mkt</span>}
            </div>
            <div style={{ fontWeight:700, fontSize:13, color:P.dark, marginBottom:6 }}>{uc.title}</div>
            <p style={{ fontSize:11, color:P.gray, lineHeight:1.5, margin:"0 0 10px" }}>{uc.desc}</p>
            <div style={{ display:"flex", gap:6 }}>
              <div style={{ flex:1, background:P.purpleLight, borderRadius:6, padding:"6px 8px" }}>
                <div style={{ fontSize:9, color:P.gray, marginBottom:2, fontWeight:600 }}>KPI</div>
                <div style={{ fontSize:10, color:P.purple, fontWeight:700 }}>{uc.kpi}</div>
              </div>
              <div style={{ flex:1, background:"#f0fdf4", borderRadius:6, padding:"6px 8px" }}>
                <div style={{ fontSize:9, color:P.gray, marginBottom:2, fontWeight:600 }}>GANHO</div>
                <div style={{ fontSize:10, color:P.green, fontWeight:700 }}>{uc.gain}</div>
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
      <div style={{ background:`linear-gradient(135deg,${P.purple},${P.blue})`, borderRadius:12, padding:"18px 16px", color:P.white, marginBottom:16 }}>
        <div style={{ fontSize:12, opacity:0.85, marginBottom:10 }}>O retorno com a implementação da Inmo se acumula em quatro áreas simultâneas da operação do Setai.</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
          {["Mídia mais eficiente","Mais leads convertidos","CAC menor","Menos distratos"].map((item,i) => (
            <div key={i} style={{ display:"flex", gap:6, alignItems:"center", fontSize:12 }}>
              <span style={{ color:P.purpleLight }}>✓</span><span style={{ opacity:0.9 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
        {roiGains.map((g,i) => (
          <Card key={i}>
            <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, background:`linear-gradient(135deg,${P.purple},${P.blue})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:P.white, fontWeight:800 }}>{i+1}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:12, color:P.dark, marginBottom:3 }}>{g.item}</div>
                <div style={{ fontSize:11, color:P.gray, lineHeight:1.5 }}>{g.basis}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ background:`linear-gradient(135deg,${P.purpleLight},${P.blueLight})`, border:`1px solid ${P.purple}33` }}>
        <div style={{ fontWeight:700, fontSize:12, color:P.dark, marginBottom:6 }}>Por que o retorno da Inmo é consistente no imobiliário</div>
        <p style={{ fontSize:11, color:P.gray, lineHeight:1.6, margin:0 }}>O ticket médio de um imóvel torna qualquer melhoria de conversão altamente significativa. Um único lead qualificado a mais por semana, que no modelo atual seria perdido fora do expediente, representa um impacto financeiro que justifica amplamente o investimento. A Inmo tem experiência direta com esse contexto em construtoras da região.</p>
      </Card>
    </div>
  );
}

// ─── ROADMAP ─────────────────────────────────────────────────────────────────
function RoadmapTab() {
  return (
    <div>
      <SH icon="🗓️" title="Plano de Implementação" sub="4 fases em 6 meses — da ativação inicial ao pós-venda automatizado" />
      <div className="phase-grid" style={{ marginBottom:14 }}>
        {roadmap.map((phase,i) => {
          const color = phase.color==="purple" ? P.purple : P.blue;
          return (
            <Card key={i} style={{ borderTop:`3px solid ${color}`, padding:"14px" }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                <div style={{ background:color, color:P.white, borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{phase.phase}</div>
                <div style={{ fontSize:11, color:P.gray }}>{phase.period}</div>
              </div>
              <div style={{ fontWeight:700, fontSize:13, color:P.dark, marginBottom:8 }}>{phase.title}</div>
              {phase.items.map((item,j) => (
                <div key={j} style={{ display:"flex", gap:6, marginBottom:5, fontSize:11 }}>
                  <span style={{ color, fontWeight:700 }}>→</span>
                  <span style={{ color:P.dark }}>{item}</span>
                </div>
              ))}
            </Card>
          );
        })}
      </div>
      <Card style={{ background:P.offWhite, border:`1.5px solid ${P.purple}33` }}>
        <div style={{ fontSize:11, color:P.purple, fontWeight:700, marginBottom:8 }}>Diferenciais da implementação</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {["Número atual mantido","Roteamento por linha","Escalável para Recife e Natal","Implementação pela Inmo","Plataforma Blip — BSP Oficial Meta"].map((t,i) => (
            <span key={i} style={{ background:P.purpleLight, color:P.purple, border:`1px solid ${P.purple}33`, borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:600 }}>{t}</span>
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
      <Card style={{ marginBottom:14, background:`linear-gradient(135deg,${P.purpleDark},${P.blueDark})`, color:P.white }}>
        <div style={{ fontSize:12, opacity:0.8, marginBottom:12 }}>A Direcional partiu de uma situação semelhante ao Setai: WhatsApp sem automação e campanhas Meta sem rastreabilidade. Após implementar IA e Click Tracker via Blip:</div>
        <div className="ref-grid">
          {caseResults.map((r,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.1)", borderRadius:8, padding:"10px 12px", border:"1px solid rgba(255,255,255,0.15)", fontSize:11 }}>
              <span style={{ marginRight:6 }}>✓</span>{r}
            </div>
          ))}
        </div>
      </Card>
      <div className="why-grid">
        {[["Inmo como parceira especializada","A Inmo tem expertise em construtoras paraibanas, com implementações integradas ao SIENGE e Construtor de Vendas.","🏗️"],
          ["Plataforma Blip — BSP Oficial Meta","Número verificado, sem risco de bloqueio, com selo de empresa aprovado pela Meta.","🔒"],
          ["Click Tracker — rastreio de campanhas","A Inmo configura o rastreamento de cada anúncio Meta até a conversa, a visita e a proposta.","📍"],
          ["IA treinada pela Inmo com seu portfólio","Agente que conhece Setai, Heritage e Reserve separadamente, com suas plantas e condições.","🤖"],
          ["Blip Go Personal para corretores","WhatsApp individual por corretor com governança central, configurado e gerido pela Inmo.","👤"],
          ["Estrutura escalável para novas praças","A Inmo replica a estrutura para Recife e Natal com analytics unificados e onboarding acompanhado.","🗺️"],
        ].map(([title,desc,icon],i) => (
          <Card key={i} style={{ padding:"12px" }}>
            <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{icon}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:12, color:P.dark, marginBottom:3 }}>{title}</div>
                <div style={{ fontSize:11, color:P.gray, lineHeight:1.4 }}>{desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── DEMO ─────────────────────────────────────────────────────────────────────
function DemoTab() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [showInsight, setShowInsight] = useState(null);
  const bottomRef = useRef(null);

  const visible = step >= 0 ? conversation.slice(0, step + 1) : [];

  function startDemo() {
    setStep(0);
    setRunning(true);
    setDone(false);
    setShowInsight(null);
  }

  useEffect(() => {
    if (!running) return;
    if (step >= conversation.length - 1) {
      setRunning(false);
      setDone(true);
      return;
    }
    const next = conversation[step + 1];
    const prev = conversation[step];
    const delay = next.delay - prev.delay;
    const t = setTimeout(() => setStep(s => s + 1), delay);
    return () => clearTimeout(t);
  }, [running, step]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior:"smooth" });
  }, [step]);

  const times = ["14:32","14:32","14:33","14:33","14:34","14:34","14:35","14:35","14:36","14:36","14:37","14:37","14:38"];

  return (
    <div>
      <SH icon="▶️" title="Demo ao Vivo" sub="Veja como a IA qualifica um lead vindo de um anúncio no Instagram" />

      {/* Contexto */}
      <Card style={{ marginBottom:14, borderLeft:`3px solid ${P.purple}` }}>
        <div style={{ fontWeight:700, fontSize:12, color:P.dark, marginBottom:6 }}>O que está acontecendo nessa conversa</div>
        <div style={{ fontSize:11, color:P.gray, lineHeight:1.6 }}>Ana Clara clicou num anúncio do Setai Residences no Instagram. O clique abriu o WhatsApp automaticamente com a IA já ativa — configurada e treinada pela Inmo com o portfólio do Setai. Nenhuma intervenção humana. O Click Tracker já registrou a origem do lead.</div>
      </Card>

      {/* Chat window — sem mockup de celular, tela cheia responsiva */}
      <div style={{ borderRadius:14, overflow:"hidden", border:"1px solid #e2e8f0", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", marginBottom:14, maxWidth:520, margin:"0 auto 14px" }}>

        {/* WA Header */}
        <div style={{ background:"#075E54", padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:P.purple, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>🏙️</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"white" }}>Setai Grupo GP</div>
            <div style={{ fontSize:10, color:"#B2DFDB" }}>✓ Conta verificada · Inmo via Blip BSP Meta</div>
          </div>
          {running && <div style={{ fontSize:10, color:"#B2DFDB", animation:"pulse 1s infinite" }}>digitando...</div>}
        </div>

        {/* Origin tag */}
        <div style={{ background:"#e8f5e9", padding:"6px 12px", borderBottom:"1px solid #c8e6c9", display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ fontSize:12 }}>📍</span>
          <span style={{ fontSize:10, color:"#2e7d32" }}><strong>Via anúncio:</strong> Setai Residences — Instagram · Click to WhatsApp · Rastreado</span>
        </div>

        {/* Messages */}
        <div style={{ background:"#ECE5DD", padding:"10px 10px 6px", minHeight:260, maxHeight:360, overflowY:"auto" }}>
          {step < 0 && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:200, flexDirection:"column", gap:8, color:"#888" }}>
              <span style={{ fontSize:36 }}>💬</span>
              <span style={{ fontSize:12, textAlign:"center" }}>Toque em iniciar para ver a conversa</span>
            </div>
          )}
          {visible.map((msg, i) => (
            <div key={msg.id} style={{ display:"flex", justifyContent:msg.from==="user"?"flex-end":"flex-start", marginBottom:4, animation:"fadeUp 0.3s ease" }}>
              <div style={{
                maxWidth:"80%", background:msg.from==="user"?"#DCF8C6":"white",
                borderRadius:msg.from==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",
                padding:"8px 10px", fontSize:12, color:"#1a1a1a", lineHeight:1.5,
                boxShadow:"0 1px 2px rgba(0,0,0,0.1)", whiteSpace:"pre-wrap",
              }}>
                {msg.text.replace(/\*(.*?)\*/g,"$1")}
                <div style={{ fontSize:9, color:"#999", textAlign:"right", marginTop:2 }}>
                  {msg.from==="user"?"✓✓ ":""}{times[i]||"14:38"}
                </div>
              </div>
            </div>
          ))}
          {running && step >= 0 && step < conversation.length - 1 && (
            <div style={{ display:"flex", marginBottom:4 }}>
              <div style={{ background:"white", borderRadius:"12px 12px 12px 2px", padding:"8px 12px", boxShadow:"0 1px 2px rgba(0,0,0,0.1)" }}>
                <div style={{ display:"flex", gap:3 }}>
                  {[0,1,2].map(k => <div key={k} style={{ width:7, height:7, borderRadius:"50%", background:"#999", animation:`bounce 1s ${k*0.2}s infinite` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{ background:"#F0F0F0", padding:"8px 10px", display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ flex:1, background:"white", borderRadius:20, padding:"7px 12px", fontSize:11, color:"#999" }}>
            {done ? "Visita confirmada! ✅" : "Digite uma mensagem"}
          </div>
          <div style={{ width:34, height:34, borderRadius:"50%", background:"#075E54", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🎤</div>
        </div>
      </div>

      {/* Botão */}
      <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
        <button onClick={startDemo} disabled={running} style={{
          background: running ? P.gray : `linear-gradient(135deg,${P.purple},${P.blue})`,
          color:"white", border:"none", borderRadius:24,
          padding:"12px 32px", cursor:running?"not-allowed":"pointer",
          fontSize:14, fontWeight:700, transition:"all 0.2s",
          boxShadow: running ? "none" : "0 4px 14px rgba(113,28,202,0.35)",
        }}>
          {running ? "⏳ Simulando conversa..." : done ? "↺ Repetir demo" : "▶ Iniciar demo"}
        </button>
      </div>

      {/* Resultado */}
      {done && (
        <div style={{ background:"#f0fdf4", border:"1px solid #86efac", borderRadius:10, padding:"12px 14px", marginBottom:14, textAlign:"center" }}>
          <div style={{ fontSize:13, fontWeight:700, color:P.green, marginBottom:4 }}>✓ Lead qualificado — visita agendada</div>
          <div style={{ fontSize:11, color:P.gray }}>Tudo automaticamente, sem humano envolvido, em menos de 2 minutos de conversa.</div>
        </div>
      )}

      {/* Insights */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }} className="why-grid">
        {demoInsights.map((item,i) => (
          <Card key={i} style={{ padding:"12px", cursor:"pointer", transition:"all 0.2s", borderLeft:`3px solid ${i%2===0?P.purple:P.blue}` }} onClick={() => setShowInsight(showInsight===i?null:i)}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:12, color:P.dark }}>{item.title}</div>
                {showInsight===i && <div style={{ fontSize:11, color:P.gray, marginTop:4, lineHeight:1.5, animation:"fadeUp 0.2s ease" }}>{item.desc}</div>}
              </div>
              <span style={{ fontSize:12, color:P.gray }}>{showInsight===i?"▲":"▼"}</span>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ textAlign:"center", fontSize:10, color:P.gray, marginTop:8 }}>Toque em cada card para ver mais detalhes</div>
    </div>
  );
}

// ─── SHARED ──────────────────────────────────────────────────────────────────
function SH({ icon, title, sub }) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
        <span style={{ fontSize:20 }}>{icon}</span>
        <h2 style={{ margin:0, fontSize:18, color:P.dark, fontWeight:800, lineHeight:1.2 }}>{title}</h2>
      </div>
      <p style={{ margin:0, color:P.gray, fontSize:12, paddingLeft:28, lineHeight:1.5 }}>{sub}</p>
      <div style={{ height:2, background:`linear-gradient(90deg,${P.purple},${P.blue},transparent)`, marginTop:10, marginLeft:28 }} />
    </div>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{ background:P.white, borderRadius:10, padding:"14px", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", border:"1px solid #e2e8f0", ...style }}>
      {children}
    </div>
  );
}
