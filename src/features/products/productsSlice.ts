import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isLiked: boolean;
}

interface ProductsState {
  items: Product[];
  categories: string[];
  filter: "all" | "liked";
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  filter: "all",
  loading: false,
  error: null,
  selectedCategory: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data.map((product: Product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      category: product.category,
      isLiked: false,
    }));
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    setFilter(state, action: PayloadAction<"all" | "liked">) {
      state.filter = action.payload;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        product => product.id !== action.payload
      );
    },
    addProduct(state, action: PayloadAction<Product>) {
      console.log("Продукт добавлен в состояние:", action.payload);
      state.items.push(action.payload);
    },

    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки данных";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.categories = action.payload;
        }
      );
  },
});

export const {
  toggleLike,
  setFilter,
  deleteProduct,
  addProduct,
  setSelectedCategory,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
