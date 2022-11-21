export const getS10nAppConfig = async (
  env: 'production' | 'testnet' = 'production'
) => {
  const baseUrl =
    env === 'production'
      ? 'https://app.s10n.io'
      : 'https://app.testnet.s10n.io';
  return fetch(`${baseUrl}/api/v1/config`).then((res) => res.json());
};
