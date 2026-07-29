import type { MetadataRoute } from "next";

export const dynamic = "force-static";

function getSiteUrl(): URL | null {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredUrl) {
    return null;
  }

  try {
    const siteUrl = new URL(configuredUrl);

    if (!["http:", "https:"].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password) {
      return null;
    }

    siteUrl.hash = "";
    siteUrl.search = "";
    siteUrl.pathname = `${siteUrl.pathname.replace(/\/$/, "")}/`;
    return siteUrl;
  } catch {
    return null;
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(siteUrl
      ? { sitemap: new URL("sitemap.xml", siteUrl).toString() }
      : {}),
  };
}
