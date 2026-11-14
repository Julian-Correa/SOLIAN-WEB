import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
}

export function Seo({ title, description, path = '/' }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', path);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, [title, description, path]);

  return null;
}
