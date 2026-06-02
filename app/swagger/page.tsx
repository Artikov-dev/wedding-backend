'use client';

import { useEffect } from 'react';

export default function SwaggerPage() {
  useEffect(() => {
    // Load swagger-ui script dynamically
    const script1 = document.createElement('script');
    script1.src = 'https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js';
    script1.async = true;
    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js';
      script2.async = true;
      script2.onload = () => {
        // Initialize Swagger UI
        if (typeof window !== 'undefined' && typeof (window as any).SwaggerUIBundle !== 'undefined') {
          (window as any).ui = (window as any).SwaggerUIBundle({
            url: '/api/docs',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              (window as any).SwaggerUIBundle.presets.apis,
              (window as any).SwaggerUIStandalonePreset
            ],
            plugins: [
              (window as any).SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
          });
        }
      };
      document.body.appendChild(script2);
    };
    document.body.appendChild(script1);

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist@3/swagger-ui.css';
    document.head.appendChild(link);
  }, []);

  return (
    <div
      id="swagger-ui"
      style={{ width: '100%', minHeight: '100vh' }}
    />
  );
}