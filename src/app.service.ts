import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Catlist } from './catlist.js';
import { Gamelist } from './gamelist.js';
import { NewJatekDto } from './jatek.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'test1'
})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  async getJatek() {
    const [results] = await mysqlConnection.execute(
      'SELECT * FROM jatekok;'
    )

    const rows = results as Gamelist[];
    return rows;
  }

  async getMacskak() {
    const [results] = await mysqlConnection.execute(
      'SELECT * FROM macskak;'
    )

    const rows = results as Catlist[];
    return rows;
  }

  async Addjatek(nev: string) {
    const [results] = await mysqlConnection.execute (
      'INSERT INTO jatekok (nev) VALUES (?)',
      [nev]
    )
    const rows = results as any;
    return {
      id: rows.insertId,
      nev
    } as NewJatekDto;
  }
}
