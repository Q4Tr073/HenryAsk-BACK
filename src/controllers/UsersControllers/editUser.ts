import { Request, Response } from "express";
import { uploadImg } from "../../cloudinary";
const User = require("../../models/Users");

export const EDIT_USER = async (req: Request, res: Response) => {
  try {
    const {
      id,
      first_name,
      last_name,
      user_name,
      email,
      country,
      city,
      role,
      posts,
      answers,
      comments,
      theorics,
      exercises,
      profile_picture,
      biography,
      github,
      linkedin,
    } = req.body;
    console.log(first_name);
    if (!id) {
      res
        .status(404)
        .json({ error: "Ha ocurrido un error al editar el usuario." });
    } else {
      const image = await uploadImg(profile_picture);

      const userEdited = await User.updateOne(
        { _id: id },
        {
          first_name: first_name && first_name,
          last_name: last_name && last_name,
          user_name: user_name && user_name,
          email: email && email,
          country: country && country,
          city: city && city,
          role: role && role,
          posts: posts && posts,
          answers: answers && answers,
          comments: comments && comments,
          theorics: theorics && theorics,
          exercises: exercises && exercises,
          profile_picture: image.secure_url,
          biography: biography && biography,
          github: github && github,
          linkedin: linkedin && linkedin,
        }
        else {
            let image;
            if(profile_picture !== ""){
                image = await uploadImg(profile_picture);
                image = image.secure_url
            } else {
                image = "";
            }

            const userEdited = await User.updateOne({ _id: id }, {
                first_name: first_name && first_name,
                last_name: last_name && last_name,
                user_name: user_name && user_name,
                email: email && email,
                country: country && country,
                city: city && city,
                role: role && role,
                posts: posts && posts,
                answers: answers && answers,
                comments: comments && comments,
                theorics: theorics && theorics,
                exercises: exercises && exercises,
                profile_picture: image,
                biography: biography && biography,
                github: github && github,
                linkedin: linkedin && linkedin
            });
            res.status(200).json(`${userEdited.matchedCount} document has been matched and ${userEdited.modifiedCount} document has been modified `);
        }
    } catch(err: any | string) {
        res.status(404).send(err.message);
    }
  } catch (err: any | string) {
    res.status(404).send(err.message);
  }
};
