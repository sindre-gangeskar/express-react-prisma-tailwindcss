import type { APIProps, ProductProps } from "../definitions";
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

export async function getRandomUserData() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (response.ok) {
      const { results } = await response.json();
      return results[ 0 ];
    }
    return null;
  } catch (error) {
    console.error(error);
    return { message: 'An error has occurred while trying to retrieve random user profile data' };;
  }
};

export async function POSTToAPI(_prevState: unknown, formdata: FormData) {
  try {
    const name = formdata.get('name');
    const description = formdata.get('description');

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, description }, null, 2)
    })
    return await response.json() as APIProps;
  } catch (error) {
    console.error(error);
    return { status: "error", statusCode: 500, message: "An internal server error has occurred while fetching to API" } as APIProps;
  }
}