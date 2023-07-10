import jwt_decode from "jwt-decode";

function isTokenValid(token) {
  const decodedToken = jwt_decode(token);
  const expirationUnix = decodedToken.exp;
  console.log('decodedToken.exp: ', decodedToken.exp);

  const now = new Date().getTime();
  const nowInUnix = Math.round(now / 1000); // converted to unix timestamp

  if (expirationUnix >= nowInUnix) {
    return true;
  } else {
    console.log('token not valid anymore')
    return false;
  }
}

export default isTokenValid;