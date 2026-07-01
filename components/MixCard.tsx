import type { Mix } from '../lib/types';

function soundcloudPlayer(url: string) {
  const enc = encodeURIComponent(url);
  return `https://w.soundcloud.com/player/?url=${enc}&color=%23E8B04B&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
}

function hasRealLink(url: string): boolean {
  if (!/^https?:\/\//i.test(url)) return false;
  // Treat bare platform homepages as "no link yet".
  const bare = ['https://soundcloud.com/', 'https://open.spotify.com/', 'https://youtube.com/', 'https://www.youtube.com/'];
  return !bare.includes(url.replace(/\/+$/, '/'));
}

export default function MixCard({ mix }: { mix: Mix }) {
  // Real embedded player only when an explicit embedUrl is set.
  if (mix.embedUrl) {
    const src = mix.platform === 'soundcloud' ? soundcloudPlayer(mix.embedUrl) : mix.embedUrl;
    return (
      <div className="mix mix-embed">
        <iframe src={src} title={mix.title} loading="lazy" allow="autoplay" />
      </div>
    );
  }

  const label = mix.platform === 'soundcloud' ? 'SoundCloud' : mix.platform === 'spotify' ? 'Spotify' : 'YouTube';
  const linked = hasRealLink(mix.url);

  const inner = (
    <>
      <span className="mix-play" aria-hidden="true">▶</span>
      <span className="mix-meta">
        <span className="mix-title">{mix.title}</span>
        <span className="mix-sub">{[mix.genre, mix.duration].filter(Boolean).join(' · ')}</span>
      </span>
      <span className={`mix-badge ${mix.platform}`}>{linked ? label : 'Soon'}</span>
    </>
  );

  if (!linked) return <div className="mix mix-soon">{inner}</div>;
  return (
    <a className="mix" href={mix.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}
