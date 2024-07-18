// backend/migrations/YYYYMMDDHHMMSS_initial_migration.js
exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('fullName').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
      })
      .createTable('products', function(table) {
        table.increments('product_id').primary();
        table.string('name').notNullable();
        table.decimal('price').notNullable();
        table.text('description');
        table.timestamps(true, true);
      })
      .createTable('categories', function(table) {
        table.increments('category_id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.timestamps(true, true);
      })
      .createTable('orders', function(table) {
        table.increments('order_id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.decimal('total_amount').notNullable();
        table.string('status').notNullable().defaultTo('In Progress');
        table.string('shipping_address').notNullable();
        table.timestamps(true, true);
      })
      .createTable('order_items', function(table) {
        table.increments('order_item_id').primary();
        table.integer('order_id').unsigned().references('order_id').inTable('orders');
        table.integer('product_id').unsigned().references('product_id').inTable('products');
        table.integer('quantity').notNullable();
        table.decimal('subtotal').notNullable();
        table.timestamps(true, true);
      })
      .createTable('cart_items', function(table) {
        table.increments('item_id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.integer('product_id').unsigned().references('product_id').inTable('products');
        table.integer('quantity').notNullable();
        table.timestamps(true, true);
      })
      .createTable('addresses', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('address').notNullable();
        table.string('country').notNullable();
        table.string('postal_code').notNullable();
        table.string('city').notNullable();
        table.string('province').notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('addresses')
      .dropTable('cart_items')
      .dropTable('order_items')
      .dropTable('orders')
      .dropTable('categories')
      .dropTable('products')
      .dropTable('users');
  };
  