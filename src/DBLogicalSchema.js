const { Sequelize, Model, DataTypes } = require('sequelize');



class LogicalSchema {
  sequelize = null;
  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'test.db'
    });


    class ProfileData extends Model {};
    ProfileData.init({
      UserId: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      AltName: {
        type: DataTypes.STRING
      },
    }, {
      sequelize: this.sequelize
    });

    
    let isProd = process.env.NODE_ENV == 'production';
    this.sequelize.sync({ alter: {drop: false }}); //alter in test only ?
  }
}

const LogicalSchemaInstance = new LogicalSchema();
//Object.freeze(LogicalSchemaInstance);

export default LogicalSchemaInstance;
