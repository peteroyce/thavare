export type CheckoutFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutFields, string>>;

export function validateCheckoutForm(fields: CheckoutFields): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (!fields.name.trim())                               errors.name    = 'Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email   = 'Valid email required';
  if (!/^\d{10}$/.test(fields.phone))                   errors.phone   = '10-digit phone required';
  if (!fields.address.trim())                            errors.address = 'Address is required';
  if (!fields.city.trim())                               errors.city    = 'City is required';
  if (!fields.state.trim())                              errors.state   = 'State is required';
  if (!/^\d{6}$/.test(fields.pincode))                  errors.pincode = '6-digit pincode required';
  return errors;
}
