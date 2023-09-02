const { verify, sign } = require("jsonwebtoken");
const { promisify } = require("util");

const { SECRET_KEY, ALGORITHM } = process.env;
const verifyJWT = promisify(verify);
const createJWT = promisify(sign);

const getAccessToken = async (
  userId,
  extraPayload = {},
  expireWithin = "3h"
) => {
  const accessToken = await createJWT(
    { userId: userId, ...extraPayload },
    SECRET_KEY,
    {
      expiresIn: expireWithin,
      algorithm: ALGORITHM,
    }
  );

  return accessToken;
};

const verifyAccessToken = async (accessToken) => {
  let payload;
  try {
    payload = await verifyJWT(accessToken, SECRET_KEY, {
      algorithm: ALGORITHM,
    });
  } catch (error) {
    console.log("Bad Auth token provided");
    return null;
  }

  return payload;
};

module.exports = { getAccessToken, verifyAccessToken };
