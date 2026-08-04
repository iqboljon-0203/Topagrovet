export function generateStaticParams() {
  return [
    { category: 'veterinariya' },
    { category: 'agro-preparatlar' },
    { category: 'barchasi' }
  ];
}

export default function Layout({ children }) {
  return children;
}
