import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  canonicalUrl?: string;
  ogImage?: string;
  twitterDescription?: string;
}

export function Seo({
  title,
  description,
  path = '/',
  canonicalUrl,
  ogImage,
  twitterDescription,
}: SeoProps) {
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
    if (twitterDescription) {
      setMeta('name', 'twitter:description', twitterDescription);
    }

    if (canonicalUrl) {
      const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonical) {
        canonical.href = canonicalUrl;
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonicalUrl;
        document.head.appendChild(link);
      }
    }

    if (ogImage) {
      const ogImageMeta = document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.content = ogImage;
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', ogImage);
        document.head.appendChild(meta);
      }
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SOLIAN',
      description,
      url: canonicalUrl ?? path,
    };
    document.head.querySelector('script[type="application/ld+json"]')?.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, [title, description, path, canonicalUrl, ogImage, twitterDescription]);

  return null;
}
