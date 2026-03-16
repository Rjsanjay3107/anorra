import { Header, Footer } from '@/components/layout';
import { Hero, Categories, Products, About, QueryForm } from '@/components/sections';
import { ProductModal } from '@/components/modals';

export default function Home() {
  return (
    <>
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
