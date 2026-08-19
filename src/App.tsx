import { AnnouncementBar, CartDrawer, Footer, Header, Toast } from './layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/Product';
import { About, Faq } from './pages/Static';
import { StoreProvider, useStore } from './store';

function Router() {
  const { route } = useStore();

  switch (route.page) {
    case 'shop':
      return (
        <Shop
          key={`${route.filter ?? 'all'}-${route.filterType ?? 'none'}`}
          initialFilter={route.filter}
          initialFilterType={route.filterType}
        />
      );
    case 'product':
      return <ProductPage key={route.slug ?? 'cream'} slug={route.slug} />;
    case 'about':
      return <About key={route.slug ?? 'top'} anchor={route.slug} />;
    case 'faq':
      return <Faq />;
    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <StoreProvider>
      <div className="noise relative min-h-screen bg-ice font-body text-ink">
        <AnnouncementBar />
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
        <CartDrawer />
        <Toast />
      </div>
    </StoreProvider>
  );
}
