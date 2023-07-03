import TwitterIcon from '@/components/Icons/SocTw'
import GithubIcon from '@/components/Icons/SocGh'
import LinkedinIcon from '@/components/Icons/SocLink'
import YoutubeIcon from '@/components/Icons/SocYt'
import PhoneIcon from '@/components/Icons/SocPhone'

export default function SocialIcons() {
  return (
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
  )
}
