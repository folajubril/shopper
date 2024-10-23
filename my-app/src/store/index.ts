import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreType } from '@/types/store';
import cartSliceType from './products';

const useStore = create<StoreType>()(
  persist(
    (...a) => ({
      ...cartSliceType(...a),
    }),
    {
      name: 'hpv_store',
      getStorage: () => localStorage,
    },
  ),
);

export default useStore;
