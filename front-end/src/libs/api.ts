import type { ProductProps } from "../definitions";

export async function getProducts(): Promise<ProductProps[] | []> {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
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
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
    if (!response.ok) throw new Error('Failed to fetch product');

    const { data } = await response.json();
    return data.product as ProductProps;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      return { status: "error", message: error.message };
    }
    throw error;
  }
}