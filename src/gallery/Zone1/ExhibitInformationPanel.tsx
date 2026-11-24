import { useEffect, useMemo, useRef, useState } from 'react'
import type { SelectedExhibit } from './types'
import type { Founder, HistoryExhibit } from './data/exhibits'
import {
  createFounderDataURL,
  createHistoryDataURL,
  createPrasastiDataURL,
} from './textures'

interface ExhibitInformationPanelProps {
  selected: SelectedExhibit | null
  onClose: () => void
}

/**
 * Museum Virtual Undip - Exhibition Information Panel
 * Features:
 * 1. Royal Navy Blue Theme with enhanced contrast & crystal clear readability.
 * 2. Split Screen History Layout: Photo/Document on the left extends FULL HEIGHT
 *    to the bottom and STAYS IN PLACE (fixed / sticky). Only the text on the right scrolls!
 * 3. Support for Founders, History Exhibits, Campus Miniature Map,
 *    Prasasti Pendirian Undip, and Monumen Pangeran Diponegoro & Kuda Putih.
 */
export function ExhibitInformationPanel({
  selected,
  onClose,
}: ExhibitInformationPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    if (selected) {
      closeRef.current?.focus()
      // Default to expanded center modal so photo and text are nicely displayed side by side
      setIsExpanded(true)
    }
  }, [selected])

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected, onClose])

  // Generate preview image based on exhibit type
  const previewSrc = useMemo(() => {
    if (!selected) return ''
    if (selected.type === 'founder') {
      const f = selected.data as Founder
      return f.imagePath && failedSrc !== f.imagePath
        ? f.imagePath
        : createFounderDataURL(f, 0)
    }
    if (selected.type === 'history') {
      const h = selected.data as HistoryExhibit
      return h.imagePath && failedSrc !== h.imagePath
        ? h.imagePath
        : createHistoryDataURL(h)
    }
    if (selected.type === 'prasasti') {
      return createPrasastiDataURL()
    }
    return ''
  }, [selected, failedSrc])

  if (!selected) return null

  const isFounder = selected.type === 'founder'
  const isHistory = selected.type === 'history'
  const isMap = selected.type === 'miniature-map'
  const isPodium = selected.type === 'podium'
  const isPrasasti = selected.type === 'prasasti'

  const founderData = isFounder ? (selected.data as Founder) : null
  const historyData = isHistory ? (selected.data as HistoryExhibit) : null

  return (
    <>
      {/* Modal Scrim Backdrop */}
      <div
        className={`gr-scrim${isExpanded ? ' gr-scrim-visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`gr-panel ${isExpanded ? 'gr-panel-expanded' : 'gr-panel-sidebar'}`}
        role="dialog"
        aria-label="Exhibition Details"
      >
        <header className="gr-panel-head">
          <div className="gr-panel-title">
            <span className="gr-badge">
              {isFounder &&
                (founderData?.category === 'pendiri-utama'
                  ? '🏛️ 5 Tokoh Pendiri Utama Undip'
                  : '🎓 Direktorat & Rektorat Undip')}
              {isHistory && `📜 ${historyData?.shortLabel || 'Arsip Sejarah'}`}
              {isMap && '🗺️ Maket Arsitektural'}
              {isPodium && '🎙️ Podium Kehormatan'}
              {isPrasasti && '🏛️ Prasasti Bersejarah'}
            </span>

            <h2 className="gr-name">
              {isFounder && founderData?.name}
              {isHistory && historyData?.title}
              {isMap && 'Maket 3D Kampus Terpadu Universitas Diponegoro'}
              {isPodium && 'Podium Kehormatan Universitas Diponegoro'}
              {isPrasasti && 'Prasasti Pendirian & Peresmian Universitas Diponegoro'}
            </h2>

            <p className="gr-years">
              {isFounder && `${founderData?.title} • (${founderData?.years})`}
              {isHistory && historyData?.period}
              {isMap && 'Pusat Utama Gedung Muladi Dome • Kawasan Tembalang'}
              {isPodium && 'Simbol Wibawa & Nilai Perjuangan Diponegoro'}
              {isPrasasti && '9 Januari 1957 • Diresmikan Presiden RI Ir. Soekarno'}
            </p>
          </div>

          <div className="gr-panel-actions">
            {/* Expand / Minimize Toggle Button */}
            <button
              type="button"
              className={`gr-btn-expand${isExpanded ? ' is-active' : ''}`}
              onClick={() => setIsExpanded((prev) => !prev)}
              title={isExpanded ? 'Perkecil ke bilah kanan' : 'Perluas tampilan (Modal Tengah)'}
              aria-label={isExpanded ? 'Perkecil modal' : 'Perluas modal ke tengah'}
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isExpanded ? (
                  <>
                    <polyline points="4 14 10 14 10 20" />
                    <polyline points="20 10 14 10 14 4" />
                    <line x1="14" y1="10" x2="21" y2="3" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </>
                ) : (
                  <>
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </>
                )}
              </svg>
            </button>

            {/* Close Button */}
            <button
              ref={closeRef}
              type="button"
              className="gr-close"
              onClick={onClose}
              aria-label="Tutup panel informasi"
            >
              ×
            </button>
          </div>
        </header>

        {/* Modal Body: Split 2-Column on Expanded Mode */}
        <div className={`gr-panel-body${isExpanded ? ' gr-body-expanded' : ''}`}>
          {/* ============================================================
              LEFT COLUMN: PHOTO / MEDIA PREVIEW
              Extends full height to the bottom, stays fixed in place!
              ============================================================ */}
          {previewSrc && (
            <div className={`gr-media-wrap${isExpanded ? ' gr-media-expanded' : ''}`}>
              <div className="gr-media-inner">
                <img
                  className="gr-portrait"
                  src={previewSrc}
                  alt={isFounder ? founderData?.name : historyData?.title || 'Koleksi Museum'}
                  onError={() => {
                    if (isFounder) setFailedSrc(founderData?.imagePath ?? null)
                    if (isHistory) setFailedSrc(historyData?.imagePath ?? null)
                  }}
                />
                <span className="gr-media-caption">
                  {isHistory && '✦ Arsip Dokumen Sejarah Undip'}
                  {isFounder &&
                    (founderData?.category === 'direktorat-rektorat'
                      ? '✦ Potret Resmi Rektor Universitas Diponegoro'
                      : '✦ Potret Tokoh Pendiri Utama Undip')}
                  {isPrasasti && '✦ Prasasti Peresmian 1957'}
                </span>
              </div>
            </div>
          )}

          {/* ============================================================
              RIGHT COLUMN: HISTORICAL CONTENT & DOCUMENTATION
              ONLY THIS CONTAINER SCROLLS
              ============================================================ */}
          <div className="gr-content-wrap">
            {/* Founder Specific Description */}
            {isFounder && founderData && (
              <div className="gr-exhibit-text">
                <h4 className="gr-sec-title">Peran Sejarah Pendirian</h4>
                <p className="gr-desc-lead">{founderData.role}</p>

                <h4 className="gr-sec-title">Biografi & Dedikasi</h4>
                <p className="gr-desc-text">{founderData.description}</p>

                {founderData.quote && (
                  <blockquote className="gr-quote">
                    "{founderData.quote}"
                  </blockquote>
                )}
              </div>
            )}

            {/* History Specific Description */}
            {isHistory && historyData && (
              <div className="gr-exhibit-text">
                <h4 className="gr-sec-title">Ringkasan Koleksi</h4>
                <p className="gr-desc-lead">{historyData.description}</p>

                <h4 className="gr-sec-title">Naskah Dokumen & Catatan Sejarah</h4>
                <div className="gr-desc-content">
                  {historyData.fullContent.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {historyData.highlights && (
                  <div className="gr-highlights-box">
                    <h4 className="gr-sec-title">Poin Penting Dokumen:</h4>
                    <ul className="gr-highlights-list">
                      {historyData.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Prasasti Specific Description */}
            {isPrasasti && (
              <div className="gr-exhibit-text">
                <h4 className="gr-sec-title">Naskah Autentik Prasasti</h4>
                <p className="gr-desc-lead">
                  Prasasti peresmian marmer hitam berukir tinta emas murni ini merekam tonggak
                  kelahiran Universitas Diponegoro dari inisiatif para pejuang kemerdekaan
                  dan cendekiawan Jawa Tengah hingga penegerian resminya oleh Presiden Sukarno.
                </p>

                <div className="gr-desc-content">
                  <p>
                    Pada hari Rabu, 9 Januari 1957, perkuliahan perdana resmi dibuka di Gedung Panti Budaya
                    Semarang dengan nama awal Yayasan Universitas Semarang. Para tokoh pendiri seperti
                    Mr. Soedarto, Mr. Imam Bardjo, dan Mr. Dan Sulaiman meletakkan dasar keilmuan yang kuat
                    bagi kemajuan masyarakat Jawa Tengah.
                  </p>
                  <p>
                    Pada upacara Dies Natalis ke-3 tanggal 9 Januari 1960, Presiden Republik Indonesia Ir. Soekarno
                    menganugerahkan nama kehormatan <strong>UNIVERSITAS DIPONEGORO</strong> sebagai penghargaan tertinggi
                    atas prestasi dan keteladanan watak kesatria Pangeran Diponegoro.
                  </p>
                  <p>
                    Status perguruan tinggi negeri dikukuhkan melalui Peraturan Pemerintah No. 7 Tahun 1961
                    dengan menetapkan tanggal 15 Oktober 1957 sebagai hari lahir (Dies Natalis) resmi institusi.
                  </p>
                </div>

                <blockquote className="gr-quote">
                  "Pernah Jaya, Tetap Jaya, Makin Jaya"
                </blockquote>

                <div className="gr-highlights-box">
                  <h4 className="gr-sec-title">Poin Penting Prasasti:</h4>
                  <ul className="gr-highlights-list">
                    <li><strong>Diresmikan:</strong> Oleh Presiden Pertama RI Ir. Soekarno</li>
                    <li><strong>Motto Luhur:</strong> "Pernah Jaya, Tetap Jaya, Makin Jaya"</li>
                    <li><strong>Presidium Pendiri:</strong> Mr. Soedarto, Mr. Imam Bardjo, Mr. Dan Sulaiman, dkk.</li>
                    <li><strong>Material:</strong> Granit Hitam Obsidian Diponegoro dengan Ukiran Emas Murni</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Miniature Map Specific Description */}
            {isMap && (
              <div className="gr-exhibit-text">
                <h4 className="gr-sec-title">Tentang Maket Kawasan Kampus</h4>
                <p className="gr-desc-lead">
                  Maket arsitektural 3D ini merepresentasikan tata ruang Kampus Terpadu
                  Universitas Diponegoro di Tembalang seluas lebih dari 180 hektar dengan pusat utama
                  gedung <strong>Muladi Dome</strong>.
                </p>

                <h4 className="gr-sec-title">Landmark & Fasilitas Utama:</h4>
                <ul className="gr-highlights-list">
                  <li><strong>Gedung Muladi Dome (Pusat Utama):</strong> Landmark gedung serbaguna beratap kubah emas modern yang menjadi pusat konvensi akbar, dinamai untuk mengenang jasa mantan Rektor Undip Prof. Dr. Muladi, S.H.</li>
                  <li><strong>Gedung Widya Puraya:</strong> Simbol monumental berbentuk piramida bertingkat yang menaungi rektorat dan sidang senat guru besar.</li>
                  <li><strong>Gedung Kuliah Bersama (GKB) & ICT Center:</strong> Pusat terintegrasi kuliah lintas disiplin dan infrastruktur digital modern.</li>
                  <li><strong>RSND (Rumah Sakit Nasional Diponegoro):</strong> Rumah sakit rujukan pendidikan tinggi modern dengan fasilitas medis terlengkap.</li>
                  <li><strong>Kompleks 11 Fakultas:</strong> Fakultas Hukum, Kedokteran, Teknik, Ekonomika & Bisnis, FSM, FISIP, FIB, FPIK, FPP, FKM, dan Psikologi.</li>
                  <li><strong>Waduk Undip & Stadion:</strong> Danau ekologis kampus dan arena olahraga mahasiswa.</li>
                </ul>
              </div>
            )}

            {/* Ceremonial Podium Specific Description */}
            {isPodium && (
              <div className="gr-exhibit-text">
                <h4 className="gr-sec-title">Podium Kehormatan Universitas</h4>
                <p className="gr-desc-lead">
                  Podium berukir jati klasik dengan lambang emas Universitas Diponegoro ini
                  digunakan dalam sidang terbuka senat akademik, upacara Dies Natalis, orasi ilmiah
                  pengukuhan guru besar, serta wisuda sarjana.
                </p>

                <h4 className="gr-sec-title">Motto & Nilai-Nilai Luhur:</h4>
                <blockquote className="gr-quote">
                  "Pernah Jaya, Tetap Jaya, Makin Jaya"
                </blockquote>
                <p className="gr-desc-text">
                  Semangat kepahlawanan Pangeran Diponegoro menjadi teladan abadi sivitas akademika
                  dalam menjunjung tinggi kejujuran ilmiah, keberanian membela kebenaran,
                  kemandirian bangsa, dan pengabdian tulus bagi kesejahteraan rakyat Indonesia.
                </p>
              </div>
            )}

            {/* Exhibit End / Continue Action Button (At the bottom of the scrollable content) */}
            <div className="gr-content-foot">
              <button type="button" className="gr-continue" onClick={onClose}>
                Kembali Menjelajah Museum
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
