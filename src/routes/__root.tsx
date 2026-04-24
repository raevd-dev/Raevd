import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import faviconIco from "../assets/favicon.ico?url";
import { ThemeProvider } from "@/hooks/use-theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RAEVD — Your Technical Partner to Start, Fix, Scale" },
      { name: "description", content: "RAEVD provides System Architecture, Custom Web Solutions, and Minimalist Design to help teams start clearly, fix issues fast, and scale reliably. Founded by Raed ElMajdoub." },
      { name: "author", content: "RAEVD" },
      { property: "og:title", content: "RAEVD — Your Technical Partner to Start, Fix, Scale" },
      { property: "og:description", content: "A high-end technical studio for system architecture, performance resolution, and minimalist digital execution." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "RAEVD — Your Technical Partner to Start, Fix, Scale" },
      { name: "twitter:description", content: "System Architecture, Custom Web Solutions, and Minimalist Design for teams that need reliability." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/40eb8ea3-60d6-4531-874d-1b270dff7c49/id-preview-a5422f9f--cb196578-c114-4936-a615-62be1d907ad2.lovable.app-1776809618380.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/40eb8ea3-60d6-4531-874d-1b270dff7c49/id-preview-a5422f9f--cb196578-c114-4936-a615-62be1d907ad2.lovable.app-1776809618380.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: faviconIco,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
