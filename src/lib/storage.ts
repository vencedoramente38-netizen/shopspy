const getUserPrefix = (): string => {
  const email = localStorage.getItem('shopspy_user_email') || 'guest';
  return `shopspy_${email.replace(/[@.]/g, '_')}`;
};

export const userStorage = {
  get: (key: string) =>
    localStorage.getItem(`${getUserPrefix()}_${key}`),

  set: (key: string, value: string) =>
    localStorage.setItem(`${getUserPrefix()}_${key}`, value),

  remove: (key: string) =>
    localStorage.removeItem(`${getUserPrefix()}_${key}`),
};
