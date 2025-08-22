# PrivacyPack.org

Pick the mainstream apps you used before, show the privacy-respecting tools you’ve switched to, and share your privacy wins!

Create your pack at [PrivacyPack.org](https://privacypack.org).

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm

### Local Development

1. Clone the repository

```bash
git clone https://github.com/ente-io/privacypack.git
cd privacypack
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .dev.vars.example .dev.vars
```

4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Testing API and database (for count of apps in packs and hashed IPs for rate limiting)

1. Setup the database

```bash
npx wrangler d1 create privacypack-db --local

npx wrangler d1 migrations apply privacypack-db --local
```

2. Start the preview server that simulates how the app will run on Cloudflare

```bash
npm run preview
```

The application will be available at `http://localhost:8787`.

## Adding new apps

New apps can be added to the catalog by modifying `/data/apps.json` and opening a PR. Each app belongs to a category and is either a mainstream app or a privacy-focused alternative.

### App logo requirements

When adding a new app, please ensure the logo meets these specifications:

- Format: JPG
- Resolution: 200x200px
- File size: < 50KB
- Location: Place the logo file in `/public/app-logos/{app_id}.jpg`
- Padding: There should be sufficient padding around the logo

## License

PrivacyPack is distributed under the [MIT license](/LICENSE).
