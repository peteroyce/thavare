import { describe, it, expect } from 'vitest';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '../products';

describe('products', () => {
  it('exports 5 products', () => {
    expect(PRODUCTS).toHaveLength(5);
  });

  it('each product has required fields', () => {
    PRODUCTS.forEach(p => {
      expect(p.id).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.images.card).toBeTruthy();
    });
  });

  it('getProductBySlug returns correct product', () => {
    const p = getProductBySlug('body-wash');
    expect(p?.name).toBe('Body Wash');
  });

  it('getProductBySlug returns undefined for unknown slug', () => {
    expect(getProductBySlug('unknown')).toBeUndefined();
  });

  it('getProductsByCategory filters correctly', () => {
    const sunCare = getProductsByCategory('sun-care');
    expect(sunCare.length).toBeGreaterThan(0);
    sunCare.forEach(p => expect(p.category).toBe('sun-care'));
  });
});
