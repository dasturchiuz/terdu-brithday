import SQLite from 'react-native-sqlite-storage';
export default class DataBase {
    db=null;
    constructor(){
        this.db = SQLite.openDatabase(
            {
              name: 'brithday.db',
              location: 'default',
              createFromLocation: '~www/brithday.db',
            },
            () => { },
            error => {
              alert("Database error")
              console.log(error);
            }
          );
    }

    //single row query 
    /**
     * 
     * @param {with limit} sql 
     * @param {*} column nomi 
     * @param {*} callback qaytuvchi funksiya
     */
    singleRowColumnQuery(table_name, column, callback){
        this.db.transaction(tx => {
            tx.executeSql("SELECT * FROM "+table_name+" LIMIT 1;", [], (tx, results) => {                          
                callback(results.rows.raw()[0][column]);
          }); 
        });
    }

    insertRow(sql, data){
        this.db.transaction(tx => {
            tx.executeSql(sql, data, (tx, results) => {                          
                callback(results.insertId!==0 ? true : false);
          }); 
        });
    }

    //single row column  query
    /**
     * 
     * @param {sql} sql 
     * @param {callback} callback 
     */
    singleRowQuery(sql, callback){
        this.db.transaction(tx => {
            tx.executeSql(sql, [], (tx, results) => {                          
                callback(results.rows.raw()[0]);
          }); 
        });
    }

    //return with callback count query
    queryCount = (sql, callback) => {   
        this.db.transaction(tx => {
          tx.executeSql(sql, [], (tx, results) => {              
            var len = results.rows.length;
            callback(len);                   
          })
        });
    }

    //query rows
    queryRows = (sql, callback) => {        
        let rows_list = [];
        this.db.transaction(tx => {
          tx.executeSql(sql, [], (tx, results) => {              
            var len = results.rows.length;
            for(let i=0; i<len;i++){
                let row = results.rows.item(i);
                rows_list.push(row)
            }
            callback(rows_list);                   
          })
        });
    }
    //databaseni yopish
    closeDb(){
        this.db.close();
    }
}