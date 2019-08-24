exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .string("vin")
      .unique()
      .notNullable();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.integer("mileage").notNullable();

    tbl.enum("transmission-type", ["automatic", "manual"]);
    tbl.enum("title-status", ["clean", "salvage"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
