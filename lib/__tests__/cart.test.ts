import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCart } from '../cart';
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
  useCart.setState({ items: [] });
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
