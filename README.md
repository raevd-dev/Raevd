# Raevd - Landing Page Development Agency

A modern, immersive web experience built with Next.js, React Three Fiber, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd raevd
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_BASE_URL=https://raevd.com
NEXT_PUBLIC_LANDING_URL=https://landing.raevd.com
```

4. Run the development server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start

# Type check
pnpm type-check

# Lint
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## 🏗️ Project Structure

```
raevd/
├── public/              # Static assets
│   ├── assets/         # Images and icons
│   └── robots.txt      # SEO robots file
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Homepage
│   │   ├── landing/     # Landing page route
│   │   └── sitemap.ts  # Dynamic sitemap
│   ├── components/      # React components
│   │   ├── StructuredData.tsx      # SEO structured data
│   │   ├── ErrorBoundary.tsx       # Error handling
│   │   └── ...         # Other components
│   └── hooks/          # Custom React hooks
└── next.config.ts       # Next.js configuration
```

## 🎨 Features

- **SEO Optimized**: Complete metadata, structured data (JSON-LD), sitemap, and robots.txt
- **Performance**: Lazy loading, code splitting, image optimization
- **Security**: Security headers, CSP, error boundaries
- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **3D Graphics**: React Three Fiber for immersive experiences

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_BASE_URL`: Main site URL (default: https://raevd.com)
- `NEXT_PUBLIC_LANDING_URL`: Landing page subdomain URL (default: https://landing.raevd.com)

### Next.js Config

The `next.config.ts` includes:
- Image optimization (AVIF, WebP)
- Security headers
- Compression
- Webpack optimizations
- Package import optimization

## 📝 SEO

The application is fully optimized for SEO with:
- Comprehensive metadata (Open Graph, Twitter Cards)
- Structured data (Organization, WebSite, WebPage, Service schemas)
- Semantic HTML
- Sitemap generation
- Robots.txt configuration
- AI search engine optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React

## 📄 License

Private - All rights reserved

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.
