import { Person, WithContext } from 'schema-dts'

const RSAllanDolle: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Allan Dollé',
  givenName: 'Allan',
  familyName: 'Dollé',
  gender: 'https://schema.org/Male',
  jobTitle: 'Analyst developer',
  email: 'hello@allandolle.fr',
  url: 'https://allandolle.fr',
  sameAs: ['https://github.com/blephy', 'https://www.facebook.com/allan.dolle', 'https://www.linkedin.com/in/blephy/'],
  birthPlace: 'Amiens',
  nationality: 'FR',
  image: {
    '@type': 'ImageObject',
    url: 'https://allandolle.fr/images/allan-dolle-developer-consultant-seo.jpg',
    width: '310',
    height: '310'
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Medical School UPJV',
    url: 'https://www.u-picardie.fr/ufr/medecine/bienvenue/ufr-de-medecine-261501.kjsp',
    telephone: '+333 22 82 77 19',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1-3 Rue des Louvels',
      addressLocality: 'Amiens',
      postalCode: '80000',
      addressRegion: 'Haut-de-France',
      addressCountry: 'FR'
    }
  },
  memberOf: {
    '@type': 'EducationalOrganization',
    name: 'HETIC',
    url: 'https://www.hetic.net',
    sameAs: [
      'https://www.facebook.com/hetic.net',
      'https://twitter.com/hetic',
      'https://www.youtube.com/user/ecolehetic',
      'https://plus.google.com/+hetic/',
      'https://instagram.com/instahetic'
    ],
    telephone: '+331 41 72 77 71',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '27 bis rue du progrès',
      addressLocality: 'Montreuil',
      postalCode: '93100',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
      areaServed: 'EU'
    }
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Evolucare Technologies',
    telephone: '+333 22 50 37 90',
    url: 'https://www.evolucare.com/',
    faxNumber: '+333 22 50 37 99',
    sameAs: ['https://www.linkedin.com/company/groupe-evolucare/'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '51 Chaussée du Val de Somme',
      addressLocality: 'Villers-Bretonneux',
      postalCode: '80800',
      addressRegion: 'Haut-de-France',
      addressCountry: 'FR',
      areaServed: 'EU'
    }
  }
}

export default RSAllanDolle
