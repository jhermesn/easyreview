// Service categories, in the order the Golden Jacket trail lists them: concepts first, then the core
// services, then the specialized ones. Every unit names one in its front matter (`category`).
import type { Locale } from '../i18n/locales';

export const CATEGORIES = [
  { id: 'cloud-concepts', name: { en: 'Cloud concepts and architecture', 'pt-br': 'Conceitos de nuvem e arquitetura' } },
  { id: 'cost-and-support', name: { en: 'Cost, billing and support', 'pt-br': 'Custos, faturamento e suporte' } },
  { id: 'security', name: { en: 'Security, identity and compliance', 'pt-br': 'Segurança, identidade e conformidade' } },
  { id: 'compute', name: { en: 'Compute', 'pt-br': 'Computação' } },
  { id: 'containers', name: { en: 'Containers', 'pt-br': 'Contêineres' } },
  { id: 'storage', name: { en: 'Storage', 'pt-br': 'Armazenamento' } },
  { id: 'databases', name: { en: 'Databases', 'pt-br': 'Bancos de dados' } },
  { id: 'networking', name: { en: 'Networking and content delivery', 'pt-br': 'Redes e entrega de conteúdo' } },
  { id: 'application-integration', name: { en: 'Application integration', 'pt-br': 'Integração de aplicações' } },
  { id: 'management', name: { en: 'Management and governance', 'pt-br': 'Gerenciamento e governança' } },
  { id: 'observability', name: { en: 'Monitoring and observability', 'pt-br': 'Monitoramento e observabilidade' } },
  { id: 'developer-tools', name: { en: 'Developer tools and DevOps', 'pt-br': 'Ferramentas de desenvolvimento e DevOps' } },
  { id: 'resilience', name: { en: 'Resilience and recovery', 'pt-br': 'Resiliência e recuperação' } },
  { id: 'analytics', name: { en: 'Analytics', 'pt-br': 'Análise de dados' } },
  { id: 'ai-ml', name: { en: 'AI and machine learning', 'pt-br': 'IA e machine learning' } },
  { id: 'migration', name: { en: 'Migration and transfer', 'pt-br': 'Migração e transferência' } },
  { id: 'end-user-and-business', name: { en: 'End user, business apps and IoT', 'pt-br': 'Usuário final, aplicações de negócio e IoT' } },
] as const satisfies { id: string; name: Partial<Record<Locale, string>> & { en: string } }[];

export type CategoryId = (typeof CATEGORIES)[number]['id'];
export const categoryIds = CATEGORIES.map((c) => c.id) as [CategoryId, ...CategoryId[]];
export function categoryName(id: string, locale: Locale): string {
  const name: Partial<Record<Locale, string>> & { en: string } | undefined = CATEGORIES.find((c) => c.id === id)?.name;
  return name?.[locale] ?? name?.en ?? id;
}
