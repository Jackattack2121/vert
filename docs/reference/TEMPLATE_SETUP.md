# Yugo Metals Website Template Setup

This template uses Directus CMS for content management. Follow these steps to set up a new website based on this template.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ and npm installed
- Git for version control

## Initial Setup

### 1. Start Directus CMS

```bash
docker-compose up -d
```

This will start:
- Directus CMS on port 8055
- PostgreSQL database

### 2. Access Directus Admin

- URL: http://localhost:8055
- Default email: `admin@yugometals.com`
- **Generate a secure password** using: `node scripts/generate-admin-password.js "YourSecurePassword"`

**Important:** Use a strong, unique password for production environments!

### 3. Create Environment File

Create a `.env.local` file in the project root:

```env
# Directus CMS Configuration
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

For production deployment, update the URL to your deployed Directus instance:

```env
NEXT_PUBLIC_DIRECTUS_URL=https://cms.yourdomain.com
```

### 4. Set Up Collections in Directus

Go to Settings > Data Model and create the following collections:

#### a) `site_config` Collection (Singleton)

1. Create new collection named `site_config`
2. Check "Treat as a single object"
3. Add fields:
   - `company_name` - Input (String)
   - `tagline` - Textarea (Text)
   - `logo` - File
   - `contact_email` - Input (String)
   - `contact_phone` - Input (String)
   - `site_id` - Input (UUID) - Mark as hidden

#### b) `homepage_hero` Collection

1. Create new collection named `homepage_hero`
2. Set sort field to `order`
3. Add fields:
   - `title` - Input (String, Required)
   - `subtitle` - Textarea (Text)
   - `description` - Textarea (Text)
   - `video` - File
   - `image` - File
   - `order` - Input (Integer)
   - `status` - Dropdown - Choices: "published", "draft"
   - `site_id` - Input (UUID) - Mark as hidden

#### c) `mining_projects` Collection

1. Create new collection named `mining_projects`
2. Set ID field type to UUID
3. Set sort field to `order`
4. Add fields:
   - `name` - Input (String, Required)
   - `slug` - Input (String, Required)
   - `hero_image` - File
   - `location` - Input (String)
   - `commodity_type` - Dropdown - Choices: "ree", "lithium", "base_precious"
   - `hero_title` - Input (String)
   - `hero_subtitle` - Textarea (Text)
   - `hero_description` - Textarea (Text)
   - `content_sections` - Code (JSON)
   - `status` - Dropdown - Choices: "published", "draft"
   - `order` - Input (Integer)
   - `site_id` - Input (UUID) - Mark as hidden

### 5. Add Initial Content

#### Site Config

1. Go to "Site Config" collection
2. Fill in company details:
   - Company Name: "Yugo Metals"
   - Tagline: "Leading the Future of Critical Minerals"
   - Upload logo
   - Add contact details

#### Homepage Hero Slides

1. Go to "Homepage Hero" collection
2. Create 2-3 hero slides:

**Example Slide 1:**
- Title: "Welcome to Yugo Metals"
- Subtitle: "Leading the Future of Critical Minerals"
- Description: "Exploring rare earth elements and battery metals across Australia's most promising mineral regions"
- Upload video: herobg.mp4
- Order: 1
- Status: published

**Example Slide 2:**
- Title: "Breakthrough High Grade Rare Earth Elements Discovery"
- Subtitle: "Mick Well - Heart of the Gascoyne Mineral Field"
- Description: "An emerging rare earths region with 913 km² of exploration tenure"
- Upload video: herobg2.mp4
- Order: 2
- Status: published

#### Mining Projects

1. Go to "Mining Projects" collection
2. Create project entries for each project page:

**Example: Mick Well Project:**
- Name: "Mick Well REE Project"
- Slug: "mick-well"
- Location: "Gascoyne Mineral Field, Western Australia"
- Commodity Type: "ree"
- Hero Title: "Mick Well REE Project"
- Hero Subtitle: "Gascoyne Mineral Field, Western Australia"
- Hero Description: "Breakthrough high grade rare earth elements discovery"
- Upload hero_image
- Status: published
- Order: 1

Repeat for other projects (Arthur River, Chalby Chalby, NSW Projects).

### 6. Install Dependencies and Start Next.js

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to see your website with CMS content!

## For New Client Sites

### Quick Deployment Checklist

1. **Clone this repository:**
   ```bash
   git clone [repository-url]
   cd yugo-metals
   ```

2. **Start Directus:**
   ```bash
   docker-compose up -d
   ```

3. **Set up collections** in Directus admin (see step 4 above)

4. **Create `.env.local`:**
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
   ```

5. **Add client content** to Directus:
   - Company details in Site Config
   - Hero slides
   - Projects

6. **Customize branding:**
   - Upload client logo
   - Update colors in `tailwind.config.ts`
   - Update company name throughout

7. **Deploy:**
   - Deploy Directus to a server/cloud platform
   - Deploy Next.js to Vercel/Netlify
   - Update `NEXT_PUBLIC_DIRECTUS_URL` in production

## Content Management

### Editing Content

All content is managed through the Directus admin panel at http://localhost:8055.

**Homepage Hero Slides:**
- Add/edit/reorder slides
- Upload new videos or images
- Publish/unpublish slides

**Projects:**
- Create new project pages
- Update existing projects
- Change display order

**Site Settings:**
- Update company information
- Change contact details
- Upload new logo

### Content Structure

Projects use a flexible `content_sections` JSON field for page content. Example:

```json
{
  "sections": [
    {
      "type": "overview",
      "title": "Project Overview",
      "content": "Project description here..."
    },
    {
      "type": "stats",
      "data": [
        { "label": "Strike Length", "value": "20km+" },
        { "label": "Resource Estimate", "value": "2.5M oz" }
      ]
    },
    {
      "type": "gallery",
      "images": ["uuid-1", "uuid-2"]
    }
  ]
}
```

## Future CoreConnect Integration

This template is prepared for multi-tenant operation with CoreConnect:

### Multi-Tenancy Fields

All collections include a hidden `site_id` field for tenant isolation. When integrating with CoreConnect:

1. **Assign unique `site_id`** to each client site
2. **Filter all queries** by `site_id`:
   ```typescript
   filter: { 
     status: { _eq: 'published' },
     site_id: { _eq: clientSiteId }
   }
   ```
3. **CoreConnect API proxy** will handle authentication and routing
4. **Custom CMS UI** in CoreConnect portal will use Directus REST API

### Migration Steps (When Ready)

1. Add `site_id` filtering to all queries in `lib/directus-queries.ts`
2. Create API proxy in CoreConnect: `/api/cms/*`
3. Build CMS management UI in CoreConnect portal
4. Migrate client data with assigned `site_id` values

## Exporting Schema for Replication

After perfecting your Directus setup, export the schema:

```bash
node scripts/export-directus-schema.js
```

This creates a snapshot that can be imported into new Directus instances, making it easy to replicate the template for new clients.

## Docker Commands Reference

```bash
# Start Directus
docker-compose up -d

# Stop Directus
docker-compose down

# View logs
docker-compose logs -f

# Restart Directus
docker-compose restart

# Remove all data and start fresh
docker-compose down -v
docker-compose up -d
```

## Troubleshooting

### Directus won't start
- Check if ports 8055 or 5432 are already in use
- View logs: `docker-compose logs -f directus`

### Cannot connect from Next.js
- Ensure `NEXT_PUBLIC_DIRECTUS_URL` is set in `.env.local`
- Check Directus CORS settings in docker-compose.yml
- Verify Directus is running: http://localhost:8055

### No data showing on website
- Verify collections are created in Directus
- Check content is marked as "published"
- Review browser console for API errors
- Ensure `status` field is set to "published" for all content

## Support

For issues or questions about this template:
1. Check the Directus documentation: https://docs.directus.io
2. Review Next.js documentation: https://nextjs.org/docs
3. Contact the template maintainer

## License

This template is provided for use with Yugo Metals and client websites managed through CoreConnect.

