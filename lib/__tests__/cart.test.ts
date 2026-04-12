import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCart } from '../cart';
import { PRODUCTS } from '../products';

const p1 = PRODUCTS[0]; // Body Wash ₹499
const p2 = PRODUCTS[1]; // Body Lotion ₹599

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
