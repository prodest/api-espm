const configRethinkDB = require("../config/rethinkdb");
const thinky = require("thinky")(configRethinkDB);
const type = thinky.type;

/**
 * Creates the base model for a table
 *
 * @param {any} tableName Name of the table
 * @return {any} Base model
 */
const baseModel = tableName => {
  return thinky.createModel(tableName, {
    id: type.number(),
    date: type.date().default(new Date())
  });
};

/**
 * Creates the base model for favorite protocol specific table
 *
 * @param {any} tableName
 * @returns
 */

const sepBaseModel = tableName => {
  const entity = thinky.createModel(tableName, {
    id: type.number(),
    date: type.date().default(new Date()),
    protocols: type.array().schema({
      number: type.string(),
      subject: type.string(),
      summary: type.string(),
      status: type.string()
    })
  });

  // entity.ensureIndex('favoriteProcess', doc => doc('id'), { multi: true });
  entity.ensureIndex("favoriteProcess", doc => doc("protocols")("number"), {
    multi: true
  });
  entity.ensureIndex("favoriteProcessOld", doc => doc("favoriteProcess"), {
    multi: true
  });

  return entity;
};

const vehicleBaseModel = tableName => {
  const entity = thinky.createModel(tableName, {
    id: type.number(),
    date: type.date().default(new Date()),
    vehicles: type.array().schema({
      color: type.string(),
      model: type.string(),
      plate: type.string(),
      renavam: type.any()
    })
  });

  entity.ensureIndex(
    "vehiclePlate",
    doc => doc("vehicles")("plate").map(val => val.downcase()),
    { multi: true }
  );

  return entity;
};

const publicTenderBaseModel = tableName => {
  const entity = thinky.createModel(tableName, {
    id: type.number(),
    date: type.date().default(new Date()),
    idTender: [type.number()]
  });
  return entity;
};

const studentOpportunitiesBaseModel = tableName => {
  const entity = thinky.createModel(tableName, {
    id: type.number(),
    date: type.date().default(new Date()),
    idOpportunity: [type.number()]
  });
  return entity;
};

const favoriteEspmModulesBaseModel = tableName => {
  const entity = thinky.createModel(tableName, {
    id: type.number(),
    date: type.date().default(new Date()),
    idModule: [type.number()]
  });
  return entity;
};

const FavoriteBusLines = baseModel("favoriteBusLines");
const FavoriteBuscaBus = baseModel("favoriteBuscaBus");
const Settings = baseModel("settings");
const Vehicles = vehicleBaseModel("vehicles");
const FavoriteSepProtocol = sepBaseModel("favoriteSepProtocol");
const FavoritePublicTender = publicTenderBaseModel("favoritePublicTender");
const FavoriteStudentOpportunities = studentOpportunitiesBaseModel("favoriteStudentOpportunities")
const FavoriteEspmModules = favoriteEspmModulesBaseModel("favoriteEspmModules");

module.exports = () => {
  const dataService = new Object();

  /**
   * Generic save method
   *
   * @param {any} Model Rethink model
   * @param {any} data Object to be saved
   * @returns {any} Save result
   */
  const save = (Model, data) => {
    data.id = data.userId;
    delete data.userId;

    return Model.get(data.id)
      .run()
      .then(res => {
        if (new Date(data.date).getTime() > new Date(res.date).getTime()) {
          return Model.get(data.id)
            .replace(data)
            .execute();
        } else {
          return res;
        }
      })
      .catch(err => {
        if (err.name === "DocumentNotFoundError") {
          const obj = new Model(data);
          return obj.save();
        } else {
          throw err;
        }
      });
  };

  // Favorite ESPM Modules
  dataService.saveFavoriteEspmModules = data => {
    return save(FavoriteEspmModules, data)
  };
  dataService.getFavoriteEspmModules = userId => {
    return FavoriteEspmModules.get(userId).run();
  };

  // FavoriteStudentOpportunities
  dataService.saveFavoriteStudentOpportunities = data => {
    return save(FavoriteStudentOpportunities, data);
  };

  dataService.getFavoriteStudentOpportunities = userId => {
    return FavoriteStudentOpportunities.get(userId).run();
  };

  // FavoritePublicTender
  dataService.saveFavoritePublicTender = data => {
    return save(FavoritePublicTender, data);
  };

  dataService.getFavoritePublicTender = userId => {
    return FavoritePublicTender.get(userId).run();
  };

  // FavoriteBusLines
  dataService.saveFavoriteBusLines = data => {
    return save(FavoriteBusLines, data);
  };

  dataService.getFavoriteBusLines = userId => {
    return FavoriteBusLines.get(userId).run();
  };

  // FavoriteBuscaBus
  dataService.saveFavoriteBuscaBus = data => {
    return save(FavoriteBuscaBus, data);
  };

  dataService.getFavoriteBuscaBus = userId => {
    return FavoriteBuscaBus.get(userId).run();
  };

  // Settings
  dataService.saveSettings = data => {
    return save(Settings, data);
  };

  dataService.getSettings = userId => {
    return Settings.get(userId).run();
  };

  // Vehicles
  dataService.saveVehicles = data => {
    return save(Vehicles, data);
  };

  dataService.getVehicles = userId => {
    return Vehicles.get(userId).run();
  };

  dataService.getUsersByVehiclePlate = plate => {
    const plates = Vehicles.getAll(plate.toLowerCase(), {
      index: "vehiclePlate"
    }).run();

    return plates.then(userList => userList.map(user => user.id));
  };

  // FavoriteSepProtocol
  dataService.saveFavoriteSepProtocol = data => {
    return save(FavoriteSepProtocol, data);
  };

  dataService.getFavoriteSepProtocol = userId => {
    return FavoriteSepProtocol.get(userId).run();
  };

  dataService.getUsersByFavoriteSepProtocol = number => {
    const oldStyleProcess = FavoriteSepProtocol.getAll(number, {
      index: "favoriteProcessOld"
    }).run();
    const process = FavoriteSepProtocol.getAll(number, {
      index: "favoriteProcess"
    }).run();

    return Promise.all([oldStyleProcess, process]).then(userList =>
      userList.reduce((a, b) => a.concat(b)).map(user => user.id)
    );
  };

  return dataService;
};
