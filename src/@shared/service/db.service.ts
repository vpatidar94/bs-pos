import * as pg from 'pg';
const url = process.env.DATABASE_URL || 'postgres://sdzcqqvskzlpcw:3cc3c914a04fb3c996b30bd524ae716950ed50291175ef15d56efbe0b18ae9a1@ec2-44-194-112-166.compute-1.amazonaws.com:5432/d9bipbphvu15id';
//K4Jfs793Sl1VpIOgCl6JW5M7
export class DbService {

    /* ************************************* Public Methods ******************************************** */
    public static fetch = (query: string, values: Array<any> = []): Promise<pg.QueryResult> => {
        return new Promise((resolve, reject) => {
            DbService._getConnectionPool().connect((err: Error, client: pg.PoolClient, done: (release?: any) => void) => {
                if (err) {
                    console.log('xx xx xx error in connection ', err);
                    reject(err);
                    return;
                }
                client.query(query, values, (err: Error, result: pg.QueryResult) => {
                    done();
                    if (err) {
                        console.log('xx xx xx error in query ', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    };

    /* ************************************* Private Methods ******************************************** */
    private static _getConnectionPool = (): pg.Pool => {
        return new pg.Pool({
            connectionString: url,
            ssl: { rejectUnauthorized: false }
        });
    };
}