# Uploading Desktop Binaries to GitHub Releases

This runbook is for `dictionary-github-io` (GitHub repo: `runableapp/dictionary`).

## Why this flow

- Large installer files (`.dmg`, `.exe`, `.AppImage`) should not be committed to git history.
- GitHub rejects files over repository size limits when pushed as normal commits.
- Release assets remain downloadable and can be linked from docs.

## Prerequisites

- `gh` CLI installed and authenticated (`gh auth status`).
- Desktop binaries available locally (example in `docs/files/`):
  - `dictionary-windows-x64-setup.exe`
  - `dictionary-macos.dmg`
  - `dictionary-1.0.0-x86_64.AppImage`

## One-time link-stable Linux filename

Linux AppImage names are often versioned. To keep a stable download URL, create a stable copy before upload:

```bash
cp docs/files/dictionary-1.0.0-x86_64.AppImage docs/files/dictionary-linux-x64.AppImage
```

## Create or update release assets

Use tag `v1.0.0` as example:

```bash
if gh release view v1.0.0 >/dev/null 2>&1; then
  gh release upload v1.0.0 \
    docs/files/dictionary-windows-x64-setup.exe \
    docs/files/dictionary-macos.dmg \
    docs/files/dictionary-linux-x64.AppImage \
    --clobber
else
  gh release create v1.0.0 \
    docs/files/dictionary-windows-x64-setup.exe \
    docs/files/dictionary-macos.dmg \
    docs/files/dictionary-linux-x64.AppImage \
    --title "Dictionary Desktop v1.0.0" \
    --notes "Windows, macOS, and Linux desktop binaries."
fi
```

## Download URLs to use in docs

Use `latest` links so docs keep working after new releases:

- Windows:
  - `https://github.com/runableapp/dictionary/releases/latest/download/dictionary-windows-x64-setup.exe`
- macOS:
  - `https://github.com/runableapp/dictionary/releases/latest/download/dictionary-macos.dmg`
- Linux:
  - `https://github.com/runableapp/dictionary/releases/latest/download/dictionary-linux-x64.AppImage`

## Pages to keep in sync

Update these files together:

- `docs/download-desktop.html`
- `docs/download-desktop.en.html`
- `docs/download-desktop.ja.html`
- `docs/download-desktop.zh.html`
- `docs/download-desktop.id.html`
- `docs/download-desktop.es.html`
- `docs/download-desktop.eo.html`

## Validation checklist

- `gh release view v1.0.0` shows all three desktop assets.
- Each `releases/latest/download/...` URL opens and downloads correctly.
- Desktop download pages in all languages point to release URLs (not `files/...`).
