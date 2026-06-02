'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '12px',
            padding: '24px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h2>Something went wrong!</h2>
          <p style={{ opacity: 0.75, textAlign: 'center', maxWidth: '640px' }}>
            {error?.message || 'Unexpected application error.'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #d0d0d0',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
