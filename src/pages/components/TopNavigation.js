import { Link } from "react-router-dom";

export default function TopNavigation() {
  return (
    <nav className="py-5 px-10 bg-purple border-b-8 border-gray-500 text-white flex items-center justify-between">
      <Link to="/"><img src='favicon.ico' alt='logo' width={'200px'} /></Link>
      <ul className='flex max-md:flex-col max-lg:gap-px gap-4 list-none'>
        <Link className={"hover:bg-yellow hover:rounded-b-xl"} to="relatorio-final-pid">Relatório Final P&D</Link>
        <Link className={"hover:bg-yellow hover:rounded-b-xl"} to="relatorio-projeto-ped">Relatório Projeto P&D</Link>
        <Link className={"hover:bg-yellow hover:rounded-b-xl"} to="interesse-projeto-ped">Relatório Interesse Projeto P&D</Link>
      </ul>
    </nav>
  );
}
