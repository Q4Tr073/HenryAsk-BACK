import {
  prop,
  getModelForClass,
  modelOptions,
  PropType,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./Users";
// import Answer from './Answers';

export enum Tags {
  JavaScript = "JavaScript",
  PostgreSQL = "PostgreSQL",
  Sequelize = "Sequelize",
  Nodejs = "Nodejs",
  Express = "Express",
  React = "React",
  Redux = "Redux",
  CSS = "CSS",
  HTML = "HTML",
  SQL = "SQL",
  Modulo = "Modulo",
  Otros = "Otros",
}
export enum Type {
  Prep,
  Learning,
}

@modelOptions({ options: { allowMixed: 0 } })
export class Post {
  @prop({ Ref: () => User, required: true }) //el id del user creador
  owner: Ref<User>;

  @prop({ required: true, trim: true, lowercase: true })
  email: string;

  @prop({ required: true, trim: true })
  question: string;

  @prop({ enum: Type, required: true })
  type: Type;

  @prop({ enum: Tags, type: () => [String], required: true }, PropType.ARRAY)
  tags: Array<Tags>;

  @prop({ maxlength: 1500 })
  description: string;

  @prop({ required: true })
  open: boolean;

  // @prop({enum: Answer, type: () => [String], required:true}, PropType.ARRAY)
  // answers: Array<Answer>;
}

export const PostModel = getModelForClass(Post);
