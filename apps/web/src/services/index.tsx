import { baseUrl } from '@/constants';
import { LayoutWithElements, Template } from '@/types';
import { Asset, AssetCategory, Background, Layout } from '@repo/db';

// get all blogpost templates
export const getBlogPostTemplates = async () => {
  const response = await fetch(`${baseUrl}/api/templates/`, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = await response.json();
  return data;
};

// get single blogpost by id
export const getBlogPostById = async (id: string) => {
  const response = await fetch(`${baseUrl}/api/templates/${id}`, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data: Template = await response.json();
  return data;
};

export const getAllBackgrounds = async () => {
  const response = await fetch(`${baseUrl}/backgrounds`, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data: { success: boolean; backgrounds: Background[] } = await response.json();
  return data;
};

export const getAllLayouts = async () => {
  const response = await fetch(`${baseUrl}/layouts`, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data: { success: boolean; layouts: LayoutWithElements[] } = await response.json();
  return data;
};

export const getCategories = async () => {
  const response = await fetch(`${baseUrl}/asset-categories`);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data: { success: boolean; assetCategories: AssetCategory[] } = await response.json();
  return data;
};

export const getAssetsByCategory = async (categoryId: string) => {
  const response = await fetch(`${baseUrl}/assets/${categoryId}`, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data: { success: boolean; assets: Asset[] } = await response.json();
  return data;
};
