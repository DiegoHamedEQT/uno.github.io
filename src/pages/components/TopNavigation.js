export default function TopNavigation() {
  return (
    <nav className="py-5 px-10 bg-purple border-b-8 border-gray-500 text-white flex items-center justify-between">
      <a href="/"><img src='/favicon.ico' alt='logo' width={'200px'} /></a>
      <ul className='flex max-md:flex-col max-lg:gap-px gap-4 list-none'>
        <CustomLink href="/relatorio-final-pid">Relatório Final P&D</CustomLink>
        <CustomLink href="/relatorio-projeto-ped">Relatório Projeto P&D</CustomLink>
        <CustomLink href="/interesse-projeto-ped">Relatório Interesse Projeto P&D</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ href, children }) {
  const pathname = window.location.pathname;

  return (
    <li className={`truncate py-1 px-2 ${pathname === href && 'rounded-b-xl bg-yellow overline'} hover:bg-yellow hover:rounded-b-xl`}>
      <a href={href}>{children}</a>
    </li>
  );
}
