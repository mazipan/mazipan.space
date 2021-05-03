export default function PostTitle ({ children }) {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl text-gradient font-heading font-bold tracking-tighter leading-tight md:leading-none mt-8 text-center md:text-left">
      {children}
    </h1>
  )
}
