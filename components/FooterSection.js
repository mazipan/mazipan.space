import TwitterIcon from '@/components/Icons/SocTw'
import GithubIcon from '@/components/Icons/SocGh'
import LinkedinIcon from '@/components/Icons/SocLink'
import YoutubeIcon from '@/components/Icons/SocYt'

export default function Footer () {
  const copyrightYear = new Date().getFullYear()

  return (
    <footer className="relative mt-4 mb-4">
      <div className="pt-4 pb-2 flex justify-center items-center">
        <a
          href="https://twitter.com/maz_ipan"
          title="Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 mx-2 bg-red-500 text-white rounded"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://github.com/mazipan"
          title="Github"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 mx-2 bg-red-500 text-white rounded"
        >
          <GithubIcon />
        </a>
        <a
          href="https://ksana.in/mzp.in"
          title="Linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 mx-2 bg-red-500 text-white rounded"
        >
          <LinkedinIcon />
        </a>
        <a
          href="https://ksana.in/mzp.yt"
          title="YouTube"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 mx-2 bg-red-500 text-white rounded"
        >
          <YoutubeIcon />
        </a>
      </div>
      <div className="pb-8 md:pb-4 flex justify-center items-center">© 2019-{copyrightYear}, All rights reserved</div>
    </footer>
  )
}
