import { Header, Footer } from '@/components/layout';
import { Hero, Categories, Products, About, QueryForm } from '@/components/sections';
import { ProductModal } from '@/components/modals';
import { GoogleSheetsStatus } from '@/components/ui/GoogleSheetsStatus';

export default function Home() {
  return (
    <>
      <GoogleSheetsStatus />
      <Header />
      <main id="main-content">
        <Hero />
        <Categories />
        <Products />
        <About />
        <QueryForm />
      </main>
      <Footer />
      <ProductModal />
    </>
  );
}
