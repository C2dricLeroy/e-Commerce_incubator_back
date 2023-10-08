const validateRessourceMiddleware = (resourceSchema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await resourceSchema.validate(resource, { abortEarly: false });
    next();
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};

module.exports = validateRessourceMiddleware;
