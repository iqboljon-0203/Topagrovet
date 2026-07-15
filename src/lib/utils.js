export function formatPrice(price) {
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
}

export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getProductsByCategory(products, category) {
  return products.filter(p => p.category === category);
}

export function getProductsBySubcategory(products, subcategory) {
  return products.filter(p => p.subcategory === subcategory);
}

export function getProductBySlug(products, slug) {
  return products.find(p => p.slug === slug);
}

export function getSimilarProducts(products, currentProduct, limit = 4) {
  return products
    .filter(p => p.id !== currentProduct.id && p.subcategory === currentProduct.subcategory)
    .slice(0, limit);
}

export function getCategoryBadgeClass(category) {
  const map = {
    'veterinariya': 'badge-vet',
    'agro': 'badge-agro',
  };
  return map[category] || 'badge-vet';
}

export function getSubcategoryBadgeClass(subcategory) {
  const map = {
    'insektisidlar': 'badge-insektisid',
    'fungisidlar': 'badge-fungisid',
    'gerbisidlar': 'badge-gerbisid',
  };
  return map[subcategory] || 'badge-agro';
}
