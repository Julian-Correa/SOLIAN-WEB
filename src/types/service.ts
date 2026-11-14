import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}
