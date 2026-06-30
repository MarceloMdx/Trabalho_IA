import { NavLink } from 'react-router-dom';
import { useLoja } from '../context/LojaContext';

const links = [
  { to: '/produtos', label: 'Produtos' },
  { to: '/carrinho', label: 'Carrinho' },
  { to: '/checkout', label: 'Checkout' },
];

function Nav() {
  const { carrinho } = useLoja();

  return (
    <nav className="nav" aria-label="Navegação principal">
      <ul className="nav__list">
        {links.map(({ to, label }) => (
          <li key={to} className="nav__item">
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              {label}
              {to === '/carrinho' && carrinho.length > 0 && (
                <span className="nav__badge" aria-label={`${carrinho.length} itens no carrinho`}>
                  {carrinho.length}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
