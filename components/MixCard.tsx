import type { Mix } from '../lib/types';

function soundcloudPlayer(url: string) {
  const enc = encodeURIComponent(url);
  return `https://w.soundcloud.com/player/?url=${enc}&color=%23E8B04B&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
}

export default function MixCard({ mix }: { mix: Mix }) {
  // Render a real player only when an explicit embedUrl is provided,
  // so the demo never shows a broken iframe.
  if (mix.embedUrl) {
    const src = mix.platform === 'soundcloud' ? soundcloudPlayer(mix.embedUrl) : mix.embedUrl;
    return (
      <div className="mix mix-embed">
        <iframe src={src} title={mix.title} loading="lazy" allow="autoplay" />
      </div>
    );
  }
  const label =
    mix.platform === 'soundcloud' ? 'SoundCloud' : mix.platform === 'spotify' ? 'Spotify' : 'YouTube';
  return (
    <a className="mix" href={mix.url} target="_blank" rel="noopener noreferrer">
      <span className="mix-play" aria-hidden="true">▶</span>
      <span className="mix-meta">
        <span className="mix-title">{mix.title}</span>
        <span className="mix-sub">{[mix.genre, mix.duration].filter(Boolean).join(' · ')}</span>
      </span>
      <span className={`mix-badge ${mix.platform}`}>{label}</span>
    </a>
  );
}
