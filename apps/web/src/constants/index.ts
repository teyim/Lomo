export const baseUrl = process.env.NEXT_PUBLIC_API_HOST ?? 'http://localhost:3001';

export const thumbnailCategories = [
  { label: 'Simple', value: 'simple' },
  { label: 'Catchy', value: 'catchy' },
  { label: 'Vox', value: 'vox' },
];

export const defaultScaleFactor = { canvas: 1, text: 1 };

export const canvasDimensions = {
  width: 1000,
  height: 420,
};

export const supportedFonts = ['lekton', 'lexend'] as const;

export const QUERY_KEYS = { Assets_By_Category: 'assetByCategory' };

// Default state for selected element
export const defaultTextElementState = {
  type: 'textbox',
  text: '',
  fontFamily: '',
  fontSize: 0,
  fill: '',
  textAlign: 'center',
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  fontWeight: 100,
};

export const defaultImageElementState = {
  type: 'image',
  src: '',
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  scaleX: 1,
  scaleY: 1,
  angle: 0,
  opacity: 1,
  flipX: false,
  flipY: false,
};

export const navbarLinks = [
  { label: 'Editor', href: '/' },
  { label: 'About', href: '/' },
  { label: 'Credits', href: '/' },
];