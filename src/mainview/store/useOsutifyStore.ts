import { create } from 'zustand';

type RepeatMode = 'none' | 'all_tracks' | 'one_track' | 'one_track_stop';

interface OsutifyStore {
  isPlaying: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
}

export const useOsutifyStore = create<OsutifyStore>((set) => ({
  isPlaying: false,
  isShuffle: false,
  repeatMode: 'none',
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  setRepeatMode: (mode: RepeatMode) => set((_) => ({ repeatMode: mode })),
}));
