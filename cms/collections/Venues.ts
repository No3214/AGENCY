import type { CollectionConfig } from 'payload';

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'city'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'city', type: 'text', required: true },
  ],
};
