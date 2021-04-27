const pg = require("pg");

class PostgresService {
    constructor() {
        this.connectionString = 'postgresql://postgres:1234@localhost:5432/universidad'
        this.pool = new pg.Pool(
            { connectionString: this.connectionString }
        );
    };

    
    async executeSql(sql){
        try {
        let result = await this.pool.query(sql);
        return result;
    } catch (error){
    };
    };
};

module.exports = PostgresService;