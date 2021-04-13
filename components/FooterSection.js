import Container from '@/components/ContainerBox'

import FacebookIcon from '@/components/icons/Facebook'
import TwitterIcon from '@/components/icons/Twitter'
import GithubIcon from '@/components/icons/Github'
import LinkedinIcon from '@/components/icons/Linkedin'
import RssIcon from '@/components/icons/Rss'

export default function Footer () {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
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
            href="https://www.linkedin.com/in/mazipan"
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
        <div className="pb-24 md:pb-4 flex justify-center items-center">© 2020 All rights reserved</div>
      </Container>
    </footer>
  )
}
