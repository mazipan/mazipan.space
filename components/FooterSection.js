import SocialIcons from './SocialIcons'

export default function Footer() {
  const copyrightYear = new Date().getFullYear()

  return (
    <footer className="relative mt-4 mb-4">
      <SocialIcons />

      <div className="flex gap-2 my-2 justify-center items-center">
        <a href="https://www.nihbuatjajan.com/mazipan" target="_blank" rel="noreferrer noopener">
          <img loading="lazy" height={30} width={110} src="https://d4xyvrfd64gfm.cloudfront.net/buttons/default-cta.png" alt="Nih buat jajan" style={{ border: '0px' }} />
        </a>

        <a href="https://trakteer.id/mazipan" target="_blank" rel="noreferrer noopener">
          <img loading="lazy" height={30} width={100} id="wse-buttons-preview" src="https://cdn.trakteer.id/images/embed/trbtn-red-1.png" style={{ border: '0px' }} alt="Trakteer Saya" />
        </a>
      </div>
      <div className="pb-8 md:pb-4 flex justify-center items-center">© 2019-{copyrightYear}, All rights reserved</div>
    </footer>
  )
}
