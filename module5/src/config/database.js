require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

console.log(`Dialect: ${process.env.DB_DIALECT}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: "./__tests__/database.sqlite", //Se inicia na raiz da aplicação
  //logging: false,
  operatorsAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
