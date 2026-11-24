import * as THREE from 'three'

/**
 * Museum Virtual Undip - Master Memory Cache
 * Prevents redundant object/texture/geometry re-renders and GPU re-allocations.
 * Caches all canvas textures, shared geometries, and materials in memory.
 */

class AssetCache {
  private textures = new Map<string, THREE.CanvasTexture>()
  private externalTextures = new Map<string, THREE.Texture>()
  private geometries = new Map<string, THREE.BufferGeometry>()
  private materials = new Map<string, THREE.Material>()

  /**
   * Get or create a cached CanvasTexture.
   * Ensures canvas drawing and GPU texture upload happen strictly once.
   */
  getTexture(key: string, factory: () => THREE.CanvasTexture): THREE.CanvasTexture {
    let tex = this.textures.get(key)
    if (!tex) {
      tex = factory()
      this.textures.set(key, tex)
    }
    return tex
  }

  /**
   * Get cached external texture if already loaded.
   */
  getExternalTexture(url: string): THREE.Texture | null {
    return this.externalTextures.get(url) ?? null
  }

  /**
   * Asynchronously load and cache external image textures in memory.
   * Ensures files are fetched and decoded only once across mounts/renders.
   */
  loadExternalTexture(url: string, onLoaded?: (tex: THREE.Texture) => void): THREE.Texture | null {
    const cached = this.externalTextures.get(url)
    if (cached) {
      if (onLoaded) onLoaded(cached)
      return cached
    }

    const loader = new THREE.TextureLoader()
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        this.externalTextures.set(url, tex)
        if (onLoaded) onLoaded(tex)
      },
      undefined,
      () => {
        // failed load handled gracefully
      },
    )
    return null
  }

  /**
   * Get or create a cached BufferGeometry.
   */
  getGeometry<T extends THREE.BufferGeometry>(key: string, factory: () => T): T {
    let geom = this.geometries.get(key) as T | undefined
    if (!geom) {
      geom = factory()
      this.geometries.set(key, geom)
    }
    return geom
  }

  /**
   * Get or create a cached Material.
   */
  getMaterial<T extends THREE.Material>(key: string, factory: () => T): T {
    let mat = this.materials.get(key) as T | undefined
    if (!mat) {
      mat = factory()
      this.materials.set(key, mat)
    }
    return mat
  }

  /**
   * Clear cache if explicitly needed (e.g. on full app reload).
   */
  clear() {
    this.textures.forEach((tex) => tex.dispose())
    this.externalTextures.forEach((tex) => tex.dispose())
    this.geometries.forEach((geom) => geom.dispose())
    this.materials.forEach((mat) => mat.dispose())
    this.textures.clear()
    this.externalTextures.clear()
    this.geometries.clear()
    this.materials.clear()
  }
}

export const assetCache = new AssetCache()
