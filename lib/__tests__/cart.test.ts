import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('@/lib/shopify', () => ({
  shopifyFetch: vi.fn(),
}));

import { shopifyFetch } from '@/lib/shopify';
import { act, renderHook } from '@testing-library/react';
import { useCart, addItemCooldowns } from '../cart';
import type { Product } from '../products';

const p1: Product = {
  id: 'body-wash', slug: 'body-wash', name: 'Body Wash',
  subtitle: 'Blue Lotus + Wild Himalayan Cherry', badge: 'Bestseller',
  description: 'Cleanses and primes active skin.', category: 'sport',
  categoryLabel: 'Sport', price: 499, variantId: 'gid://shopify/ProductVariant/1',
  inStock: true, ingredients: 'Blue Lotus, Neem', images: { card: '/a.png', main: '/a.png' },
};

const p2: Product = {
  id: 'body-lotion', slug: 'body-lotion', name: 'Body Lotion',
  subtitle: 'Blue Lotus + Sandalwood', badge: 'New',
  description: 'Deep post-workout recovery.', category: 'recovery',
  categoryLabel: 'Recovery', price: 599, variantId: 'gid://shopify/ProductVariant/2',
  inStock: true, ingredients: 'Blue Lotus, Sandalwood', images: { card: '/b.png', main: '/b.png' },
};

beforeEach(() => {
  addItemCooldowns.clear();
  useCart.setState({ items: [] });
  // Mock Date.now to auto-advance past the 300ms debounce on every call
  let clock = 1000;
  vi.spyOn(Date, 'now').mockImplementation(() => { clock += 301; return clock; });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('cart store', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toHaveLength(0);
  });

  it('addItem adds a new product', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(p1));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('addItem increments quantity for existing product', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.addItem(p1); });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('removeItem removes a product', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.removeItem(p1.id); });
    expect(result.current.items).toHaveLength(0);
  });

  it('updateQuantity changes qty', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.updateQuantity(p1.id, 5); });
    expect(result.current.items[0].quantity).toBe(5);
  });

  it('updateQuantity to 0 removes item', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.updateQuantity(p1.id, 0); });
    expect(result.current.items).toHaveLength(0);
  });

  it('totalItems sums quantities', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.addItem(p1); result.current.addItem(p2); });
    expect(result.current.totalItems()).toBe(3);
  });

  it('totalPrice sums price × qty', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.addItem(p2); });
    expect(result.current.totalPrice()).toBe(499 + 599);
  });

  it('clearCart empties all items', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.clearCart(); });
    expect(result.current.items).toHaveLength(0);
  });
});

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'body-wash',
    slug: 'body-wash',
    name: 'Body Wash',
    subtitle: 'Daily cleanse',
    description: 'A great body wash',
    longDescription: '<p>A great body wash</p>',
    category: 'sport',
    categoryLabel: 'Sport',
    price: 599,
    variantId: 'gid://shopify/ProductVariant/1',
    inStock: true,
    ingredients: 'Neem, Tulsi',
    images: { main: '/img/main.jpg', card: '/img/card.jpg' },
    ...overrides,
  };
}

describe('createShopifyCheckout', () => {
  beforeEach(() => {
    addItemCooldowns.clear();
    useCart.getState().clearCart();
    vi.clearAllMocks();
  });

  it('does nothing when cart is empty', async () => {
    await useCart.getState().createShopifyCheckout();
    expect(shopifyFetch).not.toHaveBeenCalled();
  });

  it('calls shopifyFetch with correct cart lines', async () => {
    const mp1 = makeProduct({ id: 'body-wash', variantId: 'gid://shopify/ProductVariant/1' });
    const mp2 = makeProduct({ id: 'body-lotion', variantId: 'gid://shopify/ProductVariant/2', slug: 'body-lotion', name: 'Body Lotion' });
    useCart.getState().addItem(mp1);
    useCart.getState().addItem(mp2);

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: { id: 'gid://shopify/Cart/abc', checkoutUrl: 'https://store.myshopify.com/checkout/abc' },
        userErrors: [],
      },
    });

    vi.stubGlobal('location', { href: '' });
    await useCart.getState().createShopifyCheckout();

    expect(shopifyFetch).toHaveBeenCalledWith(
      expect.stringContaining('cartCreate'),
      {
        lines: [
          { merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 1 },
          { merchandiseId: 'gid://shopify/ProductVariant/2', quantity: 1 },
        ],
      },
      'no-store',
    );
  });

  it('persists shopifyCartId in store after success', async () => {
    useCart.getState().addItem(makeProduct());

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: { id: 'gid://shopify/Cart/xyz', checkoutUrl: 'https://store.myshopify.com/checkout/xyz' },
        userErrors: [],
      },
    });

    vi.stubGlobal('location', { href: '' });
    await useCart.getState().createShopifyCheckout();

    expect(useCart.getState().shopifyCartId).toBe('gid://shopify/Cart/xyz');
  });

  it('redirects to checkoutUrl', async () => {
    useCart.getState().addItem(makeProduct());

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: { id: 'gid://shopify/Cart/abc', checkoutUrl: 'https://store.myshopify.com/checkout/abc' },
        userErrors: [],
      },
    });

    const loc = { href: '' };
    vi.stubGlobal('location', loc);
    await useCart.getState().createShopifyCheckout();

    expect(loc.href).toBe('https://store.myshopify.com/checkout/abc');
  });

  it('throws when Shopify returns userErrors', async () => {
    useCart.getState().addItem(makeProduct());

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: null,
        userErrors: [{ field: 'lines', message: 'Invalid variant' }],
      },
    });

    await expect(useCart.getState().createShopifyCheckout()).rejects.toThrow('Invalid variant');
  });
});
