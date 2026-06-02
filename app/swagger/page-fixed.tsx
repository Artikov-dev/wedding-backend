'use client';

import { useEffect, useState } from 'react';

export default function SwaggerPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Load swagger-ui script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js';
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).SwaggerUIBundle !== 'undefined') {
        (window as any).SwaggerUIBundle({
          url: '/api/docs',
          dom_id: '#swagger-ui',
          presets: [
            (window as any).SwaggerUIBundle.presets.apis,
          ],
          layout: 'BaseLayout',
        });
      }
    };
    document.body.appendChild(script);

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist@3/swagger-ui.css';
    document.head.appendChild(link);
  }, []);

  if (!isClient) {
    return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading Swagger UI...</p>
      </div>
    );
  }

  return (
    <div id="swagger-ui" style={{ width: '100%', minHeight: '100vh' }} />
  );
}
