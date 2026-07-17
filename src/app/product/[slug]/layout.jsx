import products from '@/data/products.json';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function Layout({ children }) {
  return children;
}
