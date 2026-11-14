// Every current AWS certification. Codes and names come from
// https://aws.amazon.com/certification/exams/ (checked 2026-11-09).
// A cert is "available" once it has domains and topics; the rest show as Coming soon.
export type Level = 'foundational' | 'associate' | 'professional' | 'specialty' | 'business';

export interface Domain {
  id: string;
  name: string;
  weight: number;
}
export interface Cert {
  id: string;
  code: string;
  name: string;
  level: Level;
  page: string;
  guideUrl?: string;
  domains: Domain[];
  note?: string;
  // Beta exams don't count toward holding every AWS Certification at once.
  beta?: boolean;
}

const awsCert = (slug: string) => `https://aws.amazon.com/certification/${slug}/`;

export const levels: { id: Level; name: string }[] = [
  { id: 'foundational', name: 'Foundational' },
  { id: 'associate', name: 'Associate' },
  { id: 'professional', name: 'Professional' },
  { id: 'specialty', name: 'Specialty' },
  { id: 'business', name: 'Business' },
];

export const certs: Cert[] = [
  {
    id: 'clf-c02',
    code: 'CLF-C02',
    name: 'Cloud Practitioner',
    level: 'foundational',
    page: awsCert('certified-cloud-practitioner'),
    guideUrl: 'https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html',
    domains: [
      { id: 'd1', name: 'Cloud Concepts', weight: 24 },
      { id: 'd2', name: 'Security and Compliance', weight: 30 },
      { id: 'd3', name: 'Cloud Technology and Services', weight: 34 },
      { id: 'd4', name: 'Billing, Pricing, and Support', weight: 12 },
    ],
  },
  { id: 'aif-c01', code: 'AIF-C01', name: 'AI Practitioner', level: 'foundational', page: awsCert('certified-ai-practitioner'), domains: [] },
  { id: 'saa-c03', code: 'SAA-C03', name: 'Solutions Architect - Associate', level: 'associate', page: awsCert('certified-solutions-architect-associate'), domains: [] },
  { id: 'dva-c03', code: 'DVA-C03', name: 'Developer - Associate', level: 'associate', page: awsCert('certified-developer-associate'), domains: [] },
  { id: 'soa-c03', code: 'SOA-C03', name: 'CloudOps Engineer - Associate', level: 'associate', page: awsCert('certified-cloudops-engineer-associate'), domains: [] },
  { id: 'dea-c01', code: 'DEA-C01', name: 'Data Engineer - Associate', level: 'associate', page: awsCert('certified-data-engineer-associate'), domains: [] },
  { id: 'mla-c02', code: 'MLA-C02', name: 'Machine Learning Engineer - Associate', level: 'associate', page: awsCert('certified-machine-learning-engineer-associate'), domains: [], note: 'MLA-C01 is being replaced by MLA-C02' },
  {
    id: 'dop-c02',
    code: 'DOP-C02',
    name: 'DevOps Engineer - Professional',
    level: 'professional',
    page: awsCert('certified-devops-engineer-professional'),
    guideUrl: 'https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/devops-engineer-professional-02.html',
    domains: [
      { id: 'd1', name: 'SDLC Automation', weight: 22 },
      { id: 'd2', name: 'Configuration Management and IaC', weight: 17 },
      { id: 'd3', name: 'Resilient Cloud Solutions', weight: 15 },
      { id: 'd4', name: 'Monitoring and Logging', weight: 15 },
      { id: 'd5', name: 'Incident and Event Response', weight: 14 },
      { id: 'd6', name: 'Security and Compliance', weight: 17 },
    ],
  },
  { id: 'sap-c03', code: 'SAP-C03', name: 'Solutions Architect - Professional', level: 'professional', page: awsCert('certified-solutions-architect-professional'), domains: [] },
  { id: 'aip-c01', code: 'AIP-C01', name: 'Generative AI Developer - Professional', level: 'professional', page: awsCert('certified-generative-ai-developer-professional'), domains: [] },
  { id: 'scs-c03', code: 'SCS-C03', name: 'Security - Specialty', level: 'specialty', page: awsCert('certified-security-specialty'), domains: [] },
  { id: 'ans-c01', code: 'ANS-C01', name: 'Advanced Networking - Specialty', level: 'specialty', page: awsCert('certified-advanced-networking-specialty'), domains: [], note: 'Retires December 31, 2026' },
  { id: 'aib-c01', code: 'AIB-C01', name: 'AI Business Strategist', level: 'business', page: awsCert('certified-ai-business-strategist'), domains: [], note: 'Beta exam', beta: true },
];

export const isAvailable = (c: Cert) => c.domains.length > 0;
export const availableCerts = () => certs.filter(isAvailable);
// AWS gives its Golden Jacket to people who hold every active AWS Certification at the same time.
export const goldenJacketCerts = () => certs.filter((c) => !c.beta);
// Name of the cert's badge on Credly, for example "AWS Certified DevOps Engineer - Professional".
export const credlyBadgeName = (c: Cert) => `AWS Certified ${c.name}`;

export function getCert(id: string): Cert {
  const cert = certs.find((c) => c.id === id);
  if (!cert) throw new Error(`unknown cert "${id}": add it to src/lib/certs.ts`);
  return cert;
}

export function domainName(cert: Cert, domainId: string): string {
  return cert.domains.find((d) => d.id === domainId)?.name ?? domainId;
}
