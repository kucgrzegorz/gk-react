const minLength = min => value =>
  value && value.length < min ? `Musi mieć ${min} znaków lub więcej` : undefined


export const minLength4 = minLength(4);


export const required = value => (value ? undefined : 'Pole wymagane!')