import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
const authHeader = req.get('Authorization');
if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    return next(error);
}

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
      decodedToken = jwt.verify(token, 'sljivicajesupersecrettajna');
  } catch (error) {
      error.statusCode = 500;
      throw error;
  }
  if (!decodedToken) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      return next(error);
  }
  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
