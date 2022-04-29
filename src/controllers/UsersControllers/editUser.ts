import { Request, Response } from "express";
const User = require('../../models/Users');

export const EDIT_USER = async (req: Request, res: Response) => {
    try{
        const {
            id,
            first_name,
            last_name,
            user_name,
            email,
            country,
            city,
            profile_picture,
            biography,
            github,
            linkedin
        } = req.body;

        if(!id){
            res.status(404).send('Ha ocurrido un error al editar el usuario.')
        }
        else {
            const userEdited = await User.updateOne({ _id: id }, {
                first_name: first_name && first_name,
                last_name: last_name && last_name,
                user_name: user_name && user_name,
                email: email && email,
                country: country && country,
                city: city && city,
                profile_picture: profile_picture && profile_picture,
                biography: biography && biography,
                github: github && github,
                linkedin: linkedin && linkedin
            });
            res.status(200).json(`${userEdited.matchedCount} document has been matched and ${userEdited.modifiedCount} document has been modified `);
        }
    } catch(err: any | unknown) {
        res.status(404).send(err);
    }
};