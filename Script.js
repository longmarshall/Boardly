let device;
async function connectBluetooth() {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'ESP32' }],
      optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
    });
    const server = await device.gatt.connect();
    window.characteristic = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb')
      .then(service => service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb'));
    alert("Connected to ESP32!");
  } catch (error) {
    alert("Connection failed: " + error);
  }
}

function sendScore() {
  const teamA = document.getElementById("teamA").value;
  const scoreA = document.getElementById("scoreA").value;
  const teamB = document.getElementById("teamB").value;
  const scoreB = document.getElementById("scoreB").value;
  const message = `${teamA}:${scoreA}|${teamB}:${scoreB}`;
  const encoder = new TextEncoder();
  window.characteristic.writeValue(encoder.encode(message));
}
