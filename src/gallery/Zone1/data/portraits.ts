import type { Portrait } from '../types'

/**
 * Dummy portrait data — only photo, name, and years of office are needed.
 * Replace `imagePath` with real local assets later,
 * e.g. `/portraits/kartini.jpg` placed under `public/`.
 * The corridor length is derived from this list, so adding or removing
 * entries automatically grows or shrinks the gallery.
 */
export const PORTRAITS: Portrait[] = [
  // Left wall
  { id: 'kartini', name: 'R.A. Kartini', years: '1879–1904' },
  { id: 'ki-hajar', name: 'Ki Hajar Dewantara', years: '1889–1959' },
  { id: 'soekarno', name: 'Ir. Soekarno', years: '1901–1970' },
  { id: 'hatta', name: 'Moh. Hatta', years: '1892–1980' },
  { id: 'cut-nyak', name: 'Cut Nyak Dien', years: '1848–1908' },
  { id: 'diponegoro', name: 'Pangeran Diponegoro', years: '1785–1855' },
  { id: 'kaisiepo', name: 'Frans Kaisiepo', years: '1921–1979' },
  // Right wall
  { id: 'einstein', name: 'Albert Einstein', years: '1879–1955' },
  { id: 'curie', name: 'Marie Curie', years: '1867–1934' },
  { id: 'davinci', name: 'Leonardo da Vinci', years: '1452–1519' },
  { id: 'gandhi', name: 'Mahatma Gandhi', years: '1869–1948' },
  { id: 'fleming', name: 'Alexander Fleming', years: '1881–1955' },
  { id: 'goodall', name: 'Jane Goodall', years: '1934–Present' },
  { id: 'museum-curator', name: 'Dr. Sarah Johnson', years: '1978–Present' },
]
