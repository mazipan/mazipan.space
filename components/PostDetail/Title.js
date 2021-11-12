export default function PostTitle ({ children }) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl text-gradient font-heading font-bold tracking-tighter leading-tight md:leading-none mt-8 text-center md:text-left">
      {children}
    </h1>
  )
}
