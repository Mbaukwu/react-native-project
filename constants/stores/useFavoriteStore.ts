import { create } from 'zustand';

type FavoritesStore = {
  favorites: number[];
  toggleFavorite: (id: number) => void;

};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter(fav => fav !== id)
      : [...state.favorites, id]
  }))
}));