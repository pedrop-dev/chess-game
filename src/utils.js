export function parseJwt(token) {
  if (token) {
    const base64Url = token.split('.')[1]

    if (base64Url) {
      console.log('base64Url -> ' + base64Url);
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = JSON.parse(atob(base64));
      return decodedData;
    }
  }
  return "";
}
