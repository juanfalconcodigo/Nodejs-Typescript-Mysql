import { Router } from 'express';
import UserController from '../controllers/user';

class UserRouter {

    router: Router;
    private userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.route('/list').get(this.userController.get);
        this.router.route('/create').post(this.userController.post);
        this.router.route('/update/:id').put(this.userController.put);
        this.router.route('/:id').get(this.userController.getId);
        this.router.route('/delete/:id').delete(this.userController.deleteId);
    }

}

export default UserRouter;