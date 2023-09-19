import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const getToken = async (): Promise<string> => {
  const epicClientID = process.env.EPIC_CLIENT_ID;
  const jwtSigningKey = process.env.JWT_SIGNING_KEY;
  const epicEndpoint = process.env.EPIC_ENDPOINT;
  const url = `${epicEndpoint}oauth2/token`;

  // Prepare the private key
  const privateKeyLines = jwtSigningKey.split('\\n');
  const cleanPrivateKeyLines = privateKeyLines.filter(
    (line) => line.trim() !== '',
  );
  const privateKey = cleanPrivateKeyLines.join('\n');

  const claims = {
    iss: epicClientID,
    sub: epicClientID,
    aud: url,
    jti: uuidv4(), // Generate a unique identifier
    exp: Math.floor(Date.now() / 1000) + 60, // Token expires in 60 seconds
    nbf: Math.floor(Date.now() / 1000),
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jwt.sign(claims, privateKey, { algorithm: 'RS256' });

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: token,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data.access_token;
};
