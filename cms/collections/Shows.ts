import type { CollectionConfig } from 'payload';

export const Shows: CollectionConfig = {
  slug: 'shows',
  admin: { useAsTitle: 'sid', defaultColumns: ['date', 'city', 'artistSlug', 'status'] },
  access: { read: () => true },
  fields: [
    { name: 'sid', type: 'text', required: true, unique: true },
    { name: 'date', type: 'text', required: true },
    { name: 'city', type: 'text', required: true },
    { name: 'country', type: 'text', required: true },
    { name: 'venue', type: 'text', required: true },
    { name: 'artistSlug', type: 'text', required: true },
    { name: 'status', type: 'select', options: ['confirmed', 'holding', 'limited', 'sold', 'past'], defaultValue: 'confirmed' },
    { name: 'ticketUrl', type: 'text' },
  ],
};
