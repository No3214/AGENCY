'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { getDict } from '../lib/i18n';
import type { Locale } from '../lib/types';
import { artists } from '../lib/content';

export default function BookingForm({ lang, preset }: { lang: Locale; preset?: string }) {
  const d = getDict(lang);
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad');
      setState('ok');
      form.reset();
    } catch {
      setState('err');
    }
  }

  if (state === 'ok') return <div className="form-ok">{d.book.ok}</div>;

  return (
    <form className="bform" onSubmit={onSubmit}>
      <div className="bgrid">
        <label>
          {d.book.name}
          <input name="name" required />
        </label>
        <label>
          {d.book.email}
          <input name="email" type="email" required />
        </label>
        <label>
          {d.book.org}
          <input name="org" />
        </label>
        <label>
          {d.book.artist}
          <select name="artist" defaultValue={preset || ''}>
            <option value="">{d.book.any}</option>
            {artists.map((a) => (
              <option key={a.slug} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          {d.book.city}
          <input name="city" />
        </label>
        <label>
          {d.book.country}
          <input name="country" />
        </label>
        <label>
          {d.book.date}
          <input name="date" type="date" />
        </label>
        <label>
          {d.book.budget}
          <input name="budget" placeholder="3.000 – 6.000" />
        </label>
        <label>
          {d.book.type}
          <select name="type" defaultValue="">
            <option value="">{d.book.any}</option>
            {d.book.types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="full">
        {d.book.message}
        <textarea name="message" rows={5} required />
      </label>
      <button className="btn btn-gold" disabled={state === 'sending'}>
        {state === 'sending' ? d.book.sending : d.book.send}
      </button>
      {state === 'err' && <p className="form-err">{d.book.err}</p>}
    </form>
  );
}
