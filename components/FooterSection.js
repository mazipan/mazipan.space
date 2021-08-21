import FacebookIcon from '@/components/Icons/SocFb'
import TwitterIcon from '@/components/Icons/SocTw'
import GithubIcon from '@/components/Icons/SocGh'
import LinkedinIcon from '@/components/Icons/SocLink'
import RssIcon from '@/components/Icons/SocRss'

export default function Footer () {
  const copyrightYear = new Date().getFullYear()

  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="pt-4 pb-2 flex justify-center items-center">
        <a
          href="https://www.facebook.com/mazipanneh"
          target="_blank"
          title="Facebook"
          rel="noopener noreferrer"
          className="p-1 mx-2 text-red-500 border-2 border-red-500 rounded"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://twitter.com/maz_ipan"
          title="Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 mx-2 text-red-500 border-2 border-red-500 rounded"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://github.com/mazipan"
          title="Github"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 mx-2 text-red-500 border-2 border-red-500 rounded"
        >
          <GithubIcon />
        </a>
        <a
          href="https://ksana.in/mzp.in"
          title="Linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 mx-2 text-red-500 border-2 border-red-500 rounded"
        >
          <LinkedinIcon />
        </a>
        <a
          href="/rss.xml"
          title="RSS"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 mx-2 text-red-500 border-2 border-red-500 rounded"
        >
          <RssIcon />
        </a>
      </div>
      <div className="pb-8 md:pb-4 flex justify-center items-center">© {copyrightYear} All rights reserved</div>
    </footer>
  )
}
