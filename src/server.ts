import express,{Application} from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { PORT } from './environments/environment';
import UserRouter from './routes/user';

class Server{
    private app:Application;
    private static _instance:Server;

    private constructor(){
        this.app=express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings(){
        this.app.set('PORT',PORT);
    }
    private middlewares(){
        this.app.use(cors({origin:true,credentials:true}));
        this.app.use(compression());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json());
    }

    private routes(){

        this.app.use('/user',new UserRouter().router)

    }

    static get instance(){
        return this._instance ||(this._instance=new this())
    }

    start(){
        this.app.listen(this.app.get('PORT'),(err:any)=>{
            if(err) throw new Error(err);
            console.log(`<<<<< Server Open : ${this.app.get('PORT')}  >>>>>`)
        });
    }

}

export default Server;