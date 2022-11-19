export const getS10nAppConfig = async () => {
  return fetch('https://app.s10n.io/api/v1/config').then((res) => res.json());
};
