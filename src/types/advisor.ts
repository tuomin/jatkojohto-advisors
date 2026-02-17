export interface Advisor {
  id: string;
  name: string;
  role: string;
  category: 'business' | 'thinking' | 'domain';
  background: string;
  thinkingStyle: string;
  icon: string;
}

export interface AdvisorResponse {
  advisorId: string;
  content: string;
  isLoading: boolean;
}

export const PREDEFINED_ADVISORS: Advisor[] = [
  // Business & Leadership
  {
    id: 'cfo',
    name: 'Strategic CFO',
    role: 'Chief Financial Officer',
    category: 'business',
    background: 'Seasoned finance executive with deep expertise in corporate finance, risk management, and strategic planning.',
    thinkingStyle: 'Analytical and numbers-driven. Evaluates ROI, risk-reward ratios, and financial sustainability.',
    icon: '💰'
  },
  {
    id: 'ceo',
    name: 'CEO',
    role: 'Chief Executive Officer',
    category: 'business',
    background: 'Experienced CEO with track record of scaling companies, managing stakeholders, and driving strategic vision.',
    thinkingStyle: 'Big-picture strategic thinker. Balances short-term execution with long-term vision and stakeholder interests.',
    icon: '🎯'
  },
  {
    id: 'cmo',
    name: 'CMO',
    role: 'Chief Marketing Officer',
    category: 'business',
    background: 'Marketing leader with expertise in brand strategy, market positioning, and customer acquisition.',
    thinkingStyle: 'Customer-centric and brand-aware. Focuses on market perception, competitive positioning, and growth.',
    icon: '📣'
  },
  {
    id: 'hr-director',
    name: 'HR Director',
    role: 'Human Resources Director',
    category: 'business',
    background: 'People-focused leader specializing in organizational development, talent management, and workplace culture.',
    thinkingStyle: 'People-first approach. Considers team dynamics, culture impact, and talent implications.',
    icon: '👥'
  },
  {
    id: 'ops-manager',
    name: 'Operations Manager',
    role: 'Operations Manager',
    category: 'business',
    background: 'Operations expert focused on process optimization, efficiency, and scalable systems.',
    thinkingStyle: 'Process-oriented and efficiency-focused. Looks for bottlenecks, scalability issues, and operational risks.',
    icon: '⚙️'
  },
  {
    id: 'board-member',
    name: 'Board Member',
    role: 'Board Director',
    category: 'business',
    background: 'Experienced board director with fiduciary responsibility, governance expertise, and shareholder perspective.',
    thinkingStyle: 'Governance-focused and accountability-driven. Considers fiduciary duties, long-term value creation, and strategic oversight.',
    icon: '🏛️'
  },

  // Thinking Styles
  {
    id: 'devils-advocate',
    name: "Devil's Advocate",
    role: 'Critical Challenger',
    category: 'thinking',
    background: 'Expert at finding flaws, challenging assumptions, and stress-testing ideas.',
    thinkingStyle: 'Deliberately contrarian. Questions every assumption, finds weaknesses, and pushes for stronger solutions.',
    icon: '😈'
  },
  {
    id: 'optimist',
    name: 'The Optimist',
    role: 'Opportunity Finder',
    category: 'thinking',
    background: 'Sees potential and opportunity in every situation. Expert at positive reframing and finding silver linings.',
    thinkingStyle: 'Opportunity-focused. Identifies possibilities, upside potential, and reasons for confidence.',
    icon: '☀️'
  },
  {
    id: 'pragmatist',
    name: 'The Pragmatist',
    role: 'Practical Advisor',
    category: 'thinking',
    background: 'Grounded realist who focuses on what actually works in practice, not just in theory.',
    thinkingStyle: 'Practical and realistic. Cuts through complexity to find actionable, achievable approaches.',
    icon: '🔧'
  },
  {
    id: 'creative',
    name: 'Creative Thinker',
    role: 'Innovation Catalyst',
    category: 'thinking',
    background: 'Lateral thinker who connects disparate ideas and finds unconventional solutions.',
    thinkingStyle: 'Divergent and imaginative. Breaks patterns, combines unlikely ideas, and challenges conventional wisdom.',
    icon: '💡'
  },

  // Domain Experts
  {
    id: 'legal',
    name: 'Legal Counsel',
    role: 'Legal Advisor',
    category: 'domain',
    background: 'Corporate attorney with expertise in compliance, contracts, and risk mitigation.',
    thinkingStyle: 'Risk-aware and compliance-focused. Identifies legal implications, liability, and regulatory considerations.',
    icon: '⚖️'
  },
  {
    id: 'tech-architect',
    name: 'Technical Architect',
    role: 'Technology Leader',
    category: 'domain',
    background: 'Senior technologist with expertise in system design, feasibility assessment, and technical strategy.',
    thinkingStyle: 'Systems-thinking approach. Evaluates technical feasibility, scalability, and implementation complexity.',
    icon: '🏗️'
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analyst',
    role: 'Financial Analyst',
    category: 'domain',
    background: 'Data-driven analyst specializing in financial modeling, market analysis, and investment evaluation.',
    thinkingStyle: 'Quantitative and evidence-based. Focuses on numbers, trends, benchmarks, and ROI projections.',
    icon: '📊'
  },
  {
    id: 'marketing-strategist',
    name: 'Marketing Strategist',
    role: 'Marketing Strategist',
    category: 'domain',
    background: 'Strategic marketer with expertise in audience analysis, go-to-market strategy, and messaging.',
    thinkingStyle: 'Audience-focused. Considers market positioning, messaging, competitive landscape, and customer perception.',
    icon: '🎪'
  },
];
