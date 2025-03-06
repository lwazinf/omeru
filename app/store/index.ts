import { atom } from 'jotai';

// Model selection atoms
export type ModelType = 'image' | 'video' | 'audio' | 'language' | '3d';

export const selectedModelTypeAtom = atom<ModelType>('image');

// Contact form atoms
export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const contactFormAtom = atom<ContactFormData>({
  name: '',
  email: '',
  message: '',
});

// Theme atoms
export type ThemeMode = 'light' | 'dark';

export const themeModeAtom = atom<ThemeMode>('light');

// Mobile menu atom
export const mobileMenuOpenAtom = atom<boolean>(false); 