import Meta from '@/components/Meta/Custom'
import LayoutArticle from '@/components/Layout/Default'
import { SITE_METADATA } from '@/lib/constants'

export default function Index () {
  return (
    <>
      <LayoutArticle>
        <>
          <Meta
            lang="id"
            title="❤️ Support Me // mazipan.space"
            description="How to support mazipan to keep the blog mazipan.space alive"
            url={`${SITE_METADATA.url}/support`}
          />
          <h2 className="mb-8 text-6xl md:text-7xl font-heading font-bold tracking-tighter leading-tight">
            ❤️  Support Me
          </h2>
          <div className="content">
            <p className="mb-4">Consider to support me to always keep this blog alive and updating the contents, you can support me via:</p>
            <ul>
              <li>
                <span className="mr-2">👉</span>
                <a
                  className="text-red-500 hover:underline pr-2 md:pr-4"
                  href="https://trakteer.id/mazipan/tip?utm_source=github"
                  rel="nofollow"
                >
                  <span className="mr-2">🇮🇩</span> Trakteer
                </a>
              </li>
              <li>
                <span className="mr-2">👉</span>
                <a
                  className="text-red-500 hover:underline pr-2 md:pr-4"
                  href="https://www.buymeacoffee.com/mazipan?utm_source=github"
                  rel="nofollow"
                >
                  <span className="mr-2">🌍</span> BuyMeACoffe
                </a>
              </li>
              <li>
                <span className="mr-2">👉</span>
                <a
                  className="text-red-500 hover:underline pr-2 md:pr-4"
                  href="https://ko-fi.com/mazipan"
                  rel="nofollow"
                >
                  <span className="mr-2">🌍</span> Ko-Fi
                </a>
              </li>
              <li>
                <span className="mr-2">👉</span>
                <a
                  className="text-red-500 hover:underline pr-2 md:pr-4"
                  href="https://www.paypal.me/mazipan?utm_source=github"
                  rel="nofollow"
                >
                  <span className="mr-2">🌍</span> Paypal
                </a>
              </li>
            </ul>
            
            <div className="flex gap-2">
              <a href="https://www.nihbuatjajan.com/mazipan" target="_blank" rel="noreferrer noopener">
                <img src="https://d4xyvrfd64gfm.cloudfront.net/buttons/default-cta.png" alt="Nih buat jajan" style={{height: '40px !important'}} />
              </a>

              <a href="https://trakteer.id/mazipan" target="_blank" rel="noreferrer noopener">
                <img id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-red-1.png" height={40} style={{border: '0px', height: '40px'}} alt="Trakteer Saya" />
              </a>
            </div>
            
          </div>
        </>
      </LayoutArticle>
    </>
  )
}
