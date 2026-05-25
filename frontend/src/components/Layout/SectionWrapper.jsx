export default function SectionWrapper({id,title,children}){return <section id={id} className='max-w-5xl mx-auto p-4'><h2 className='text-2xl font-bold mb-4'>{title}</h2>{children}</section>}
