const QRCode = require('qrcode');

const url = 'https://pedruzz30.github.io/cardapio-oliva/';

QRCode.toFile('cardapio-oliva-qr.png', url, {
  width: 500
}, function (err) {
  if (err) throw err;
  console.log('QR gerado: cardapio-oliva-qr.png');
});
