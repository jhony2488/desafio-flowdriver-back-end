const db = require('../config/database.cjs');

export async function connectionDB() {
  try {
    const resultado = await db.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
}
