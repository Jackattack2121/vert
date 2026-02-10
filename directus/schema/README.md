# Directus Schema Documentation

This directory contains JSON schema definitions for all Directus collections used in the Vert Capital portal system.

## Collections Overview

### Portal Collections

1. **portal_users** - User accounts for portal access
   - Shareholders and institutional clients
   - Role-based access control
   - Profile information and preferences

2. **portfolios** - Investment holdings
   - Shareholder portfolio data
   - Share quantities, cost basis
   - Purchase dates and notes

3. **client_documents** - Private document library
   - Secure document storage
   - Role-based access control
   - Download tracking

4. **messages** - Communication system
   - User-to-admin messaging
   - Threaded conversations
   - Status tracking (open, replied, resolved)

5. **calendar_events** - Events and meetings
   - AGMs, meetings, deadlines
   - Role-based visibility
   - Email reminders

6. **news_posts** - Blog and news articles
   - Public-facing content
   - SEO optimization
   - Category organization

### Existing Collections

7. **presentations** - Already exists (investor presentations)

## Import Instructions

### Method 1: Manual Import via Directus UI

1. Start Directus:
   ```bash
   docker-compose up -d
   ```

2. Access Directus at http://localhost:8055

3. Navigate to **Settings → Data Model**

4. Click **Create Collection** for each schema

5. Manually add fields based on the JSON schema

### Method 2: Directus CLI (Recommended)

```bash
# Install Directus CLI if not already installed
npm install -g @directus/cli

# Apply each schema
directus schema apply ./directus/schema/portal_users.json
directus schema apply ./directus/schema/portfolios.json
directus schema apply ./directus/schema/client_documents.json
directus schema apply ./directus/schema/messages.json
directus schema apply ./directus/schema/calendar_events.json
directus schema apply ./directus/schema/news_posts.json
```

### Method 3: Database Script

A setup script is provided to automatically create all collections:

```bash
node scripts/setup-directus-portal.js
```

## Permissions Setup

After importing the collections, configure permissions in Directus:

### Portal User Role

Create a custom role called "Portal User" with these permissions:

- **portal_users**: Read own record only
- **portfolios**: Read own records only
- **client_documents**: Read documents assigned to them
- **messages**: Create new, read/update own messages
- **calendar_events**: Read events visible to their role
- **news_posts**: Read published posts only

### Admin Role

- Full access to all collections
- Can manage all portal users
- Can respond to messages
- Can upload documents

## Data Relationships

```
portal_users
  ├── portfolios (one-to-many)
  ├── client_documents (one-to-many via user_id)
  └── messages (one-to-many)

client_documents
  ├── Can be assigned to specific user
  └── Or available to all users of a role

calendar_events
  └── Filtered by user role (shareholder/institutional)

news_posts
  └── Public (no user relationship)
```

## Environment Variables

Add these to your `.env.local`:

```bash
# Directus Configuration
DIRECTUS_URL=http://localhost:8055
DIRECTUS_ADMIN_EMAIL=admin@yugometals.com
DIRECTUS_ADMIN_PASSWORD=your-secure-password

# For production
DIRECTUS_URL=https://directus.your-domain.com
```

## API Access

The Next.js application will access these collections via the Directus SDK:

```typescript
import { createDirectus, rest, readItems } from '@directus/sdk';

const client = createDirectus(process.env.DIRECTUS_URL!).with(rest());

// Example: Fetch portal user
const user = await client.request(
  readItems('portal_users', {
    filter: { email: { _eq: 'user@example.com' } }
  })
);
```

## Security Notes

1. **Never expose Directus admin credentials** - Use separate API tokens for Next.js
2. **Enable row-level security** - Users can only access their own data
3. **Validate file uploads** - Restrict file types and sizes
4. **Rate limit API calls** - Prevent abuse
5. **Enable HTTPS** - All production traffic must be encrypted

## Maintenance

### Backup Collections

```bash
# Export all collections
directus schema snapshot ./backups/schema-$(date +%Y%m%d).json
```

### Update Schema

After modifying collection structure in Directus:

```bash
# Export updated schema
directus schema snapshot ./directus/schema/collection_name.json
```

## Support

For questions or issues:
- Directus Documentation: https://docs.directus.io
- Schema Reference: https://docs.directus.io/reference/system/collections.html
