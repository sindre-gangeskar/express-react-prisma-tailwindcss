import type { ProductProps } from "../definitions";
const url = import.meta.env.VITE_BACKEND_URL;

export async function getProducts(): Promise<ProductProps[] | []> {
  try {
    const response = await fetch(`${url}/api/products`, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    if (response.ok) {
      const { data } = await response.json();
      console.log(data.products);
      return data.products as ProductProps[];
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProduct(id: number) {
  try {
    const response = await fetch(`${url}/api/products/${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
    if (!response.ok) throw new Error('Failed to fetch product');

    const { data } = await response.json();
    return data.product as ProductProps;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRandomProduct(): Promise<ProductProps> {
  const response = await fetch(`${url}/api/products/random`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });
  if (!response.ok) throw new Error('Failed to retrieve product information');
  const { data } = await response.json();
  return data.product as ProductProps;
}

export async function searchProduct(search: string): Promise<ProductProps[]> {
  try {
    const response = await fetch(`${url}/api/products/search/${search}`, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      method: 'GET',
    })

    if (response.ok) {
      const { data } = await response.json();
      return data.products as ProductProps[];
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}