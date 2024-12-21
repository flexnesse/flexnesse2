'use client';

import { useParams } from 'next/navigation';
import ProductCatalog from '@/components/ProductCatalog';

export default function ProductsPage() {
  const params = useParams();
  const category = params.category;

  return (
    <div>
      <ProductCatalog initialCategory={category} />
    </div>
  );
}
