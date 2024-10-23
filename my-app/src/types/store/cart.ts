
  interface Product {
    id: any;
    price: number;
    quantity: number;
    productTotal: number;
    title: string;
  }
  
  interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface CartSliceType {
    cart: any;
    setCart: (args: any | null) => void;
  }
  