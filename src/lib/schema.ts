export const SITE_URL = 'https://mister-wallet.com';

/** Single source for the publisher entity, reused by the home graph and the About page. */
export function organizationSchema(siteUrl: string = SITE_URL) {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Mr Wallet',
    alternateName: ['Mister Wallet'],
    legalName: 'Grey Workers Togo',
    url: siteUrl,
    logo: `${siteUrl}/icon-512x512.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'contact@mister-wallet.com' },
    sameAs: ['https://github.com/Grey-Workers-Togo/mr-wallet'],
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
