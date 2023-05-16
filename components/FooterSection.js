import TwitterIcon from '@/components/Icons/SocTw'
import GithubIcon from '@/components/Icons/SocGh'
import LinkedinIcon from '@/components/Icons/SocLink'
import YoutubeIcon from '@/components/Icons/SocYt'
import PhoneIcon from '@/components/Icons/SocPhone'

export default function Footer() {
  const copyrightYear = new Date().getFullYear()

  return (
    <footer className="relative mt-4 mb-4">
      <div className="pt-4 pb-2 flex justify-center items-center gap-2">
        <a
          href="https://twitter.com/maz_ipan"
          title="Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-red-500 text-white rounded"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://github.com/mazipan"
          title="Github"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-red-500 text-white rounded"
        >
          <GithubIcon />
        </a>
        <a
          href="https://ksana.in/mzp.in"
          title="Linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-red-500 text-white rounded"
        >
          <LinkedinIcon />
        </a>
        <a
          href="https://ksana.in/mzp.yt"
          title="YouTube"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-red-500 text-white rounded"
        >
          <YoutubeIcon />
        </a>
        <a
          href="https://ksana.in/mzp.1on1"
          title="Meeting 1-on-1"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-red-500 text-white rounded"
        >
          <PhoneIcon />
        </a>
      </div>

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
