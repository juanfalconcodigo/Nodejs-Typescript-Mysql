import { Pool, createPool } from 'mysql2/promise';

//esto se llama en cada conexión
const connect = async (): Promise<Pool> => {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        database: 'NodejsMysql',
        connectionLimit: 10,
    });
    return connection;
}

export default connect;
