import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import SkipLink from './SkipLink';

function Layout() {
  return (
    <>
      <SkipLink />

      <div className="app">
        <Header />
        <Nav />

        <main id="conteudo-principal" className="app__main" role="main" tabIndex={-1}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Layout;
