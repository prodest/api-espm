module.exports = app => {
  const dataController = require("../controllers/dataController")();

  app.post("/data/favoriteBusLines", dataController.saveFavoriteBusLines);
  app.get("/data/favoriteBusLines", dataController.getFavoriteBusLines);
  app.post("/ceturb/data/favorite", dataController.saveFavoriteBusLines);
  app.get("/ceturb/data/favorite", dataController.getFavoriteBusLines);

  app.post(
    "/ceturb/transcolOnline/data/favoriteStops",
    dataController.saveFavoriteBuscaBus
  );
  app.get(
    "/ceturb/transcolOnline/data/favoriteStops",
    dataController.getFavoriteBuscaBus
  );

  app.post("/data/settings", dataController.saveSettings);
  app.get("/data/settings", dataController.getSettings);

  app.post("/data/vehicles", dataController.saveVehicles);
  app.get("/data/vehicles", dataController.getVehicles);
  app.post("/detran/data/vehicles", dataController.saveVehicles);
  app.get("/detran/data/vehicles", dataController.getVehicles);

  app.post("/sep/data/favorite", dataController.saveFavoriteSepProtocol);
  app.get("/sep/data/favorite", dataController.getFavoriteSepProtocol);

  app.post(
    "/publicTender/data/favorite",
    dataController.saveFavoritePublicTender
  );
  app.get(
    "/publicTender/data/favorite",
    dataController.getFavoritePublicTender
  );

  app.post(
    "/studentOpportunities/data/favorite",
    dataController.saveFavoriteStudentOpportunities
  );
  app.get(
    "/studentOpportunities/data/favorite",
    dataController.getFavoriteStudentOpportunities
  );

  return app;
};
