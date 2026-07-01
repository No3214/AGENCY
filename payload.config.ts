import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Users } from './cms/collections/Users';
import { Artists } from './cms/collections/Artists';
import { Venues } from './cms/collections/Venues';
import { Shows } from './cms/collections/Shows';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: { user: Users.slug },
  collections: [Users, Artists, Venues, Shows],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me-min-32-characters-000',
  typescript: { outputFile: path.resolve(dirname, 'cms/payload-types.ts') },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./afterhouse.db' } }),
});
