export default function sitemap() {
    return [
      {
        url: 'https://parking-hunter.vercel.app',
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://parking-hunter.vercel.app/lottery',
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];
  }
  