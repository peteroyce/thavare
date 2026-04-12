import { describe, it, expect } from 'vitest';
import { validateCheckoutForm } from '../checkout';

describe('validateCheckoutForm', () => {
  const valid = {
    name: 'Pete Saldanha',
    email: 'pete@example.com',
    phone: '9876543210',
    address: '123 MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
  };

  it('returns no errors for valid data', () => {
    expect(validateCheckoutForm(valid)).toEqual({});
  });

  it('requires name', () => {
    const errors = validateCheckoutForm({ ...valid, name: '' });
    expect(errors.name).toBeTruthy();
  });

  it('requires valid email', () => {
    const errors = validateCheckoutForm({ ...valid, email: 'not-an-email' });
    expect(errors.email).toBeTruthy();
  });

  it('requires 10-digit phone', () => {
    const errors = validateCheckoutForm({ ...valid, phone: '123' });
    expect(errors.phone).toBeTruthy();
  });

  it('requires 6-digit pincode', () => {
    const errors = validateCheckoutForm({ ...valid, pincode: '123' });
    expect(errors.pincode).toBeTruthy();
  });
});
