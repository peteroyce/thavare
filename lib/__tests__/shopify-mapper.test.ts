import { describe, it, expect } from 'vitest';
import { mapShopifyProduct } from '../shopify-mapper';
import type { ShopifyProductNode } from '../shopify-mapper';

function makeNode(overrides: Partial<ShopifyProductNode> = {}): ShopifyProductNode {
  return {
    id: 'gid://shopify/Product/1',
    handle: 'body-wash',
    title: 'Body Wash',
    descriptionHtml: '<p>A great body wash</p>',
    description: 'A great body wash',
    subtitle: { value: 'Daily cleanse' },
    badge: { value: 'Best Seller' },
    category: { value: 'sport' },
    category_label: { value: 'Sport' },
    ingredients: { value: 'Neem, Tulsi' },
    how_to_use: null,
    images: {
      edges: [
        { node: { url: 'https://cdn.shopify.com/s/files/main.jpg', altText: 'Body Wash' } },
        { node: { url: 'https://cdn.shopify.com/s/files/card.jpg', altText: null } },
      ],
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/1',
          title: 'Default',
          price: { amount: '599.00', currencyCode: 'INR' },
          availableForSale: true,
        },
      }],
    },
    ...overrides,
  };
}

describe('mapShopifyProduct', () => {
  it('maps handle to slug and id', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.slug).toBe('body-wash');
    expect(p.id).toBe('body-wash');
  });

  it('maps title to name', () => {
    const p = mapShopifyProduct(makeNode({ title: 'Sun Screen SPF 50' }));
    expect(p.name).toBe('Sun Screen SPF 50');
  });

  it('maps price as integer rounded from string', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.price).toBe(599);
  });

  it('maps variantId from first variant', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.variantId).toBe('gid://shopify/ProductVariant/1');
  });

  it('maps inStock true from availableForSale true', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.inStock).toBe(true);
  });

  it('maps inStock false from availableForSale false', () => {
    const p = mapShopifyProduct(makeNode({
      variants: {
        edges: [{ node: { id: 'gid://shopify/ProductVariant/1', title: 'Default', price: { amount: '599.00', currencyCode: 'INR' }, availableForSale: false } }],
      },
    }));
    expect(p.inStock).toBe(false);
  });

  it('maps first image to images.main', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.images.main).toBe('https://cdn.shopify.com/s/files/main.jpg');
  });

  it('maps second image to images.card', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.images.card).toBe('https://cdn.shopify.com/s/files/card.jpg');
  });

  it('falls back images.card to images.main when only one image', () => {
    const node = makeNode();
    node.images.edges = [{ node: { url: 'https://cdn.shopify.com/s/files/main.jpg', altText: null } }];
    const p = mapShopifyProduct(node);
    expect(p.images.card).toBe('https://cdn.shopify.com/s/files/main.jpg');
  });

  it('falls back subtitle to empty string when metafield absent', () => {
    const p = mapShopifyProduct(makeNode({ subtitle: null }));
    expect(p.subtitle).toBe('');
  });

  it('defaults category to daily-essentials when metafield absent', () => {
    const p = mapShopifyProduct(makeNode({ category: null }));
    expect(p.category).toBe('daily-essentials');
  });
});
