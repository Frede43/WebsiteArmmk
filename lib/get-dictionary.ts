import 'server-only'

const dictionaries = {
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'fr' | 'en' | 'es') => 
  dictionaries[locale] ? dictionaries[locale]() : dictionaries.fr()
