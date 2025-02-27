let conn = require('./db');
var path = require('path')

module.exports = {
  getMenus() {

    return new Promise((resolve, reject) => {

      conn.query(`
        SELECT * FROM tb_menus ORDER BY title`, (err, results) => {

        if (err) {
          reject(err)
        }

        resolve(results)
      })
    })
  },

  save(fields, files){

    fields.photo = `images/${path.paser(files.photo.path).base}`

    return new Promise((resolve, reject) => {

      conn.query(`
          INSERT INTO tb_menus (title, description, price, photo)
          VALUES(?, ?, ?, ?)
          `, [
            fields.title,
            fields.description,
            fields.price,
            fields.photo
          ], (err, results) => {

            if(err){
              reject(err)
            }else {
              resolve(results)
            }
          })
    })
  }
}