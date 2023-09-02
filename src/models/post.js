const { DataTypes } = require("sequelize");

const sequelize = require("../../database");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "author_id",
  },
});

module.exports = Post;
