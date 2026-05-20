const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../.env' });
const { poolPromise, sql } = require('../config/db');

async function seedUsers() {
  try {
    const pool = await poolPromise;
    console.log('Conectado a la base de datos para seeding...');

    // 1. Asegurar que existen los roles base (Administrador, Operario, Responsable)
    const rolesBase = [
      { nombre: 'Administrador', desc: 'Administrador del sistema' },
      { nombre: 'Operario', desc: 'Operario de planta' },
      { nombre: 'Responsable', desc: 'Responsable de planta' }
    ];

    const roleIds = {};

    for (const r of rolesBase) {
      let roleResult = await pool.request()
        .input('nombre', sql.VarChar, r.nombre)
        .query('SELECT id FROM SNC.roles WHERE nombre = @nombre');
        
      if (roleResult.recordset.length === 0) {
        console.log(`Creando rol ${r.nombre}...`);
        const insertRole = await pool.request()
          .input('nombre', sql.VarChar, r.nombre)
          .input('desc', sql.VarChar, r.desc)
          .query('INSERT INTO SNC.roles (nombre, descripcion) OUTPUT INSERTED.id VALUES (@nombre, @desc)');
        roleIds[r.nombre] = insertRole.recordset[0].id;
      } else {
        roleIds[r.nombre] = roleResult.recordset[0].id;
      }
    }

    // 2. Crear usuario administrador
    const adminMail = 'admin@maflow.com';
    const adminPasswordPlain = 'admin123';

    const adminResult = await pool.request()
      .input('mail', sql.VarChar, adminMail)
      .query('SELECT id FROM SNC.usuarios WHERE mail = @mail');

    if (adminResult.recordset.length > 0) {
      console.log(`El usuario administrador ${adminMail} ya existe. Actualizando contraseña...`);
      const hashedAdminPassword = await bcrypt.hash(adminPasswordPlain, 10);
      await pool.request()
        .input('mail', sql.VarChar, adminMail)
        .input('password', sql.VarChar, hashedAdminPassword)
        .query('UPDATE SNC.usuarios SET password = @password WHERE mail = @mail');
      console.log(`Contraseña de ${adminMail} actualizada correctamente.`);
    } else {
      console.log(`Creando usuario administrador (${adminMail})...`);
      const hashedAdminPassword = await bcrypt.hash(adminPasswordPlain, 10);
      await pool.request()
        .input('mail', sql.VarChar, adminMail)
        .input('password', sql.VarChar, hashedAdminPassword)
        .input('estado', sql.Bit, 1)
        .input('idrol', sql.Int, roleIds['Administrador'])
        .query('INSERT INTO SNC.usuarios (mail, password, estado, idrol) VALUES (@mail, @password, @estado, @idrol)');
      console.log(`Usuario administrador creado con éxito.`);
    }

    // 3. Crear usuario operario de prueba (para el botón de acceso rápido)
    const opMail = 'operario@maflow.com';
    const opPasswordPlain = '123456';

    const opResult = await pool.request()
      .input('mail', sql.VarChar, opMail)
      .query('SELECT id FROM SNC.usuarios WHERE mail = @mail');

    if (opResult.recordset.length > 0) {
      console.log(`El usuario operario ${opMail} ya existe. Actualizando contraseña...`);
      const hashedOpPassword = await bcrypt.hash(opPasswordPlain, 10);
      await pool.request()
        .input('mail', sql.VarChar, opMail)
        .input('password', sql.VarChar, hashedOpPassword)
        .query('UPDATE SNC.usuarios SET password = @password WHERE mail = @mail');
    } else {
      console.log(`Creando usuario operario (${opMail})...`);
      const hashedOpPassword = await bcrypt.hash(opPasswordPlain, 10);
      await pool.request()
        .input('mail', sql.VarChar, opMail)
        .input('password', sql.VarChar, hashedOpPassword)
        .input('estado', sql.Bit, 1)
        .input('idrol', sql.Int, roleIds['Operario'])
        .query('INSERT INTO SNC.usuarios (mail, password, estado, idrol) VALUES (@mail, @password, @estado, @idrol)');
      console.log(`Usuario operario creado con éxito.`);
    }

    console.log('\n--- CREDENCIALES GENERADAS ---');
    console.log(`Administrador : ${adminMail} / ${adminPasswordPlain}`);
    console.log(`Operario      : ${opMail} / ${opPasswordPlain}`);
    console.log('------------------------------');

  } catch (err) {
    console.error('Error durante el seeding:', err);
  } finally {
    process.exit();
  }
}

seedUsers();
