module.exports = function (app) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};