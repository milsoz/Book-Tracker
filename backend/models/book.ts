import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../connect"

interface BookAttributes {
  id: number
  title: string
  author: string
  read: boolean
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number
  public title!: string
  public author!: string
  public read!: boolean

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "books",
  }
)

export default Book
