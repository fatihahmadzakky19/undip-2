import { useEffect, useRef } from 'react'
import type { HeritageBook } from '../data/books'

interface InteractiveBookModalProps {
  book: HeritageBook | null
  onClose: () => void
}

/**
 * Editorial Interactive Heritage Book Modal
 * Designed in accordance with Undip Library & Museum Master Specification:
 * - Royal Navy Blue header with Antique Gold accents
 * - Ivory parchment editorial background
 * - Left column: Realistic leather-bound hardcover book rendering
 * - Right column: Title, category, year, summary, key excerpts, and archival citations
 */
export function InteractiveBookModal({ book, onClose }: InteractiveBookModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (book) {
      closeBtnRef.current?.focus()
    }
  }, [book])

  useEffect(() => {
    if (!book) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [book, onClose])

  if (!book) return null

  return (
    <>
      {/* Dark backdrop scrim */}
      <div className="gr-scrim gr-scrim-visible" onClick={onClose} aria-hidden="true" />

      {/* Main modal container */}
      <div className="gr-book-modal-root" role="dialog" aria-label="Book Information">
        {/* Header */}
        <header className="gr-book-head">
          <div className="gr-book-badge-wrap">
            <span className="gr-book-badge">✦ KOLEKSI KHUSUS PERPUSTAKAAN SEJARAH UNDIP</span>
            <span className="gr-book-callno">{book.callNumber}</span>
          </div>
          <button
            ref={closeBtnRef}
            className="gr-book-close-btn"
            onClick={onClose}
            aria-label="Tutup Informasi Buku"
          >
            ✕
          </button>
        </header>

        {/* Modal Body */}
        <div className="gr-book-body">
          {/* Left Column: Leather Hardcover Book Showcase */}
          <div className="gr-book-cover-col">
            <div
              className="gr-book-cover-card"
              style={{
                backgroundColor: book.coverColor,
                borderColor: book.accentColor,
              }}
            >
              {/* Gold Filigree Corner Ornaments */}
              <div className="gr-book-corner gr-top-left" />
              <div className="gr-book-corner gr-top-right" />
              <div className="gr-book-corner gr-bottom-left" />
              <div className="gr-book-corner gr-bottom-right" />

              {/* Decorative Spine Ribs */}
              <div className="gr-book-spine-line" />

              {/* University Seal / Emblem Stamp */}
              <div className="gr-book-seal">
                <span className="gr-book-seal-text">UNIVERSITAS DIPONEGORO</span>
                <span className="gr-book-seal-sub">SEMARANG</span>
              </div>

              {/* Title & Author on Cover */}
              <div className="gr-book-cover-text">
                <h3 className="gr-book-cover-title">{book.title}</h3>
                <div className="gr-book-gold-rule" />
                <p className="gr-book-cover-author">{book.author}</p>
                <p className="gr-book-cover-year">Tahun Terbit / Arsip: {book.year}</p>
              </div>

              {/* Bottom Archival Callout */}
              <div className="gr-book-cover-footer">
                <span>{book.category}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Archival Metadata (Scrollable) */}
          <div className="gr-book-content-col">
            <div className="gr-book-meta-bar">
              <span className="gr-book-meta-tag">Kategori: {book.category}</span>
              <span className="gr-book-meta-dot">•</span>
              <span className="gr-book-meta-tag">Tahun: {book.year}</span>
              <span className="gr-book-meta-dot">•</span>
              <span className="gr-book-meta-tag">{book.callNumber}</span>
            </div>

            <h2 className="gr-book-title">{book.title}</h2>
            <h4 className="gr-book-subtitle">{book.subtitle}</h4>
            <p className="gr-book-author">Oleh: <strong>{book.author}</strong></p>

            <div className="gr-book-divider" />

            {/* Ringkasan Eksekutif */}
            <section className="gr-book-sec">
              <h5 className="gr-book-sec-title">Ringkasan Koleksi</h5>
              <p className="gr-book-lead">{book.abstract}</p>
            </section>

            {/* Konteks & Uraian Sejarah Lengkap */}
            <section className="gr-book-sec">
              <h5 className="gr-book-sec-title">Konteks Historis & Naskah Dokumen</h5>
              <p className="gr-book-text">{book.fullOverview}</p>
            </section>

            {/* Kutipan Naskah Autentik */}
            {book.keyExcerpts.length > 0 && (
              <section className="gr-book-sec">
                <h5 className="gr-book-sec-title">Kutipan Naskah Bersejarah</h5>
                <div className="gr-book-quotes-box">
                  {book.keyExcerpts.map((q, idx) => (
                    <blockquote key={idx} className="gr-book-quote">
                      {q}
                    </blockquote>
                  ))}
                </div>
              </section>
            )}

            {/* Daftar Isi / Bab */}
            {book.tableOfContents && book.tableOfContents.length > 0 && (
              <section className="gr-book-sec">
                <h5 className="gr-book-sec-title">Struktur Bab / Naskah</h5>
                <ul className="gr-book-toc">
                  {book.tableOfContents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Nilai Historis & Sumber Arsip */}
            <div className="gr-book-archive-footer">
              <p>
                <strong>Signifikansi Sejarah:</strong> {book.historicalSignificance}
              </p>
              <p>
                <strong>Sumber Dokumentasi Arsip:</strong> {book.archivalSource}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
