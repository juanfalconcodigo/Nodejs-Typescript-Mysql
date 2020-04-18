import { Request, Response } from 'express';
import connect from '../environments/database';
import { SP_LIST_USER, SP_CREATE_USER, SP_UPDATE_USER, SP_USER_ID, SP_DELETE_USER } from '../environments/environment';

class UserController {

    constructor() {

    }

    async get(req: Request, res: Response): Promise<Response> {

        const connection = await connect();
        try {
            const users: any = await connection.query(SP_LIST_USER);
            return await res.json({
                ok: true,
                users: users[0][0]
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Huvo un problema'
                }
            });
        }
    }

    async post(req: Request, res: Response): Promise<Response> {
        const connection = await connect();
        try {
            //falta validar el campo age
            const { name, lastName, age } = req.body;
            if (name.length === 0 || lastName.length === 0 || age.length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `Verifique datos ingresados`
                    }
                });
            }
            const user = await connection.query(SP_CREATE_USER, [name, lastName, Number(age)]);
            /* console.log(user); */
            return await res.status(201).json({
                ok: true,
                message: `Registro exitoso`
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Huvo un problema'
                }
            });
        }
    }

    async put(req: Request, res: Response): Promise<Response> {
        const connection = await connect();
        try {
            const { id } = req.params;
            const { name, lastName, age } = req.body;
            const user: any = await connection.query(SP_USER_ID, [id]);
            if (user[0][0].length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `No existe un usuario con el id : ${id}`
                    }
                });
            }
            //falta validar tipo de dato de edad
            if (name.length === 0 || lastName.length === 0 || age.length === 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `Verifique datos ingresados`
                    }
                });
            }
            const puUser = await connection.query(SP_UPDATE_USER, [id, name, lastName, Number(age)]);
            return await res.status(202).json({
                ok: true,
                message: `Se actualizo correctamente`
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Huvo un problema'
                }
            });
        }
    }

    async getId(req: Request, res: Response): Promise<Response> {
        const connection = await connect();
        try {
            const { id } = req.params;
            const user: any = await connection.query(SP_USER_ID, [id]);
            if (user[0][0].length === 0) {
                return await res.status(400).json({
                    ok: false,
                    err: {
                        message: `No existe un usuario con el id : ${id}`
                    }
                });
            }
            return await res.json({
                ok: true,
                user: user[0][0][0],
                message: `Usuario encontrado`
            });
        } catch (err) {
            return await res.status(500).json({
                ok: false,
                err: {
                    message: 'Huvo un problema'
                }
            });
        }
    }

    async deleteId(req: Request, res: Response): Promise<Response> {
        const connection = await connect();
        try {
            const { id } = req.params;
            const user: any = await connection.query(SP_USER_ID, [id]);
            if (user[0][0].length === 0) {
                return await res.status(400).json({
                    ok: false,
                    err: {
                        message: `No existe un usuario con el id : ${id}`
                    }
                });
            }
            const deleteUser: any = await connection.query(SP_DELETE_USER, [id]);
            return res.status(202).json({
                ok: true,
                message: `Se elimino correctamente`,
                user: user[0][0]
            });
        } catch (err) {
            return await res.status(500).json({
                ok: false,
                err: {
                    message: 'Huvo un problema'
                }
            });
        }
    }

}

export default UserController;