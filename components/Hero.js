import SocialIcons from './SocialIcons'

const style = {
  clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
}

function GradientTop() {
  return (
    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={style}></div>
    </div>
  )
}

function GradientBottom() {
  return (
    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={style}></div>
    </div>
  )
}

export default function Hero() {
  return (
    <div className=" relative isolate px-6 pt-14 lg:px-8">
      <GradientTop />

      <div className="min-h-screen mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gradient md:text-4xl lg:text-6xl">
          👋 Hi, I'm Irfan Maulana
        </h1>
        <p className="mt-10 text-lg text-gray-600 md:text-2xl lg:text-3xl dark:text-gray-200">A seasoned web developer from Indonesia with 10+ years of experience.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <SocialIcons />
        </div>
      </div>

      <GradientBottom />
    </div>
  )
}
