import dayjs from 'dayjs'
import { addMessages, date, init } from 'svelte-i18n'
import { derived } from 'svelte/store'

import de from './locales/de.json'
import en from './locales/en.json'

export type LocalizedItem = {
  languages_id: string
}

init({
  fallbackLocale: 'de-DE',
})

addMessages('en', en)
addMessages('de', de)

export const formatDate = derived(date, (date) => (d: string) => date(dayjs(d).toDate(), { dateStyle: 'medium' }))
export const formatTime = (time: string) => time.slice(0, 5)

export function getLocale<T extends LocalizedItem>(
  translations: T[],
  item: Exclude<keyof T, 'languages_id'>,
  prefix: string
) {
  const key = `${prefix}.${item.toString()}`
  for (const translation of translations) {
    const value = translation[item as keyof LocalizedItem] as string
    addMessages(translation.languages_id, { [key]: value })
  }
  return key
}
