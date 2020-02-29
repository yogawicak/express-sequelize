// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('data_bengkel',[{
      nama_bengkel: 'Bengkel Sepeda Seli',
      alamat_bengkel: 'Jl. Cemp. Putih Barat No.2, RT.1/RW.3, Cemp. Putih Bar., Kec. Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10520',
      no_telpon_bengkel: 00000000,
      jam_buka:7,
      jam_tutup:18,
      Latitude:-6.173969,
      Longitude:106.860411,
      img_bengkel:'seli.jpg',
   }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
