import '@/styles/index.css'
import '@/styles/markdown-shiki-styles.css'

// https://nextjs.org/docs/advanced-features/measuring-performance#sending-results-to-analytics
export function reportWebVitals({ id, name, label, value }) {
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true
  })
}

export default function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}
