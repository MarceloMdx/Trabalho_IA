import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import SkipLink from './SkipLink';

function Layout() {
  return (
    <>
      <SkipLink />

      {/* div wrapper sem tag semântica equivalente — agrupa header, nav, main e footer */}
      <div className="app">
        <Header />
        <Nav />

        {/* tabIndex={-1} permite receber foco programático após o skip link */}
        <main id="conteudo-principal" className="app__main" tabIndex={-1}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Layout;
