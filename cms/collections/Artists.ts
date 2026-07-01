import type { CollectionConfig } from 'payload';

export const Artists: CollectionConfig = {
  slug: 'artists',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'flagship'] },
  access: { read: () => true },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'name', type: 'text', required: true },
    { name: 'flagship', type: 'checkbox', defaultValue: false },
    { name: 'taglineEn', type: 'text' },
    { name: 'taglineTr', type: 'text' },
    { name: 'bioEn', type: 'textarea' },
    { name: 'bioTr', type: 'textarea' },
    { name: 'genres', type: 'text', hasMany: true },
    { name: 'basedIn', type: 'text' },
    { name: 'accentA', type: 'text', defaultValue: '#E8B04B' },
    { name: 'accentB', type: 'text', defaultValue: '#C8881F' },
    { name: 'setFormats', type: 'text', hasMany: true },
    {
      name: 'socials',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'soundcloud', type: 'text' },
        { name: 'spotify', type: 'text' },
        { name: 'website', type: 'text' },
      ],
    },
    {
      name: 'mixes',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'platform', type: 'select', options: ['soundcloud', 'spotify', 'youtube'], defaultValue: 'soundcloud' },
        { name: 'url', type: 'text' },
        { name: 'embedUrl', type: 'text' },
        { name: 'duration', type: 'text' },
        { name: 'genre', type: 'text' },
      ],
    },
  ],
};
