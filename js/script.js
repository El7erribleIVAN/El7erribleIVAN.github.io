// Recurso y límite de máquinas actualizado
let resources = {
  air: 0,
  fire: 0,
  water: 0,
  earth: 0,
  lava: 0
};

let machines = {
  air: { count: 0, cost: 10, max: 10, perSecond: 0.1 },
  fire: { count: 0, cost: 20, max: 8, perSecond: 0.2 },
  water: { count: 0, cost: 15, max: 12, perSecond: 0.15 },
  earth: { count: 0, cost: 25, max: 15, perSecond: 0.3 },
  lava: { count: 0, cost: 30, max: 5, perSecond: 0.5 }
};

// Precargar sonidos
const sounds = {
  collect: new Audio('/assets/sounds/collect-sound.mp3'),
  machine: new Audio('/assets/sounds/machine-sound.mp3')
};

// Función para reproducir sonido precargado
function playSound(sound) {
  if (sound.readyState >= 2) { // Verifica que el audio esté cargado
      const clonedSound = sound.cloneNode(); // Permite overlap
      clonedSound.play();
  } else {
      console.warn('El sonido no está cargado:', sound.src);
  }
}


let lastCollectSoundTime = 0;
let lastMachineSoundTime = 0;
let lastAnimationTime = 0;
const animationDelay = 500; // 500ms de espera entre animaciones

// Función para guardar el progreso
function saveProgress() {
  localStorage.setItem('resources', JSON.stringify(resources));
  localStorage.setItem('machines', JSON.stringify(machines));
}

// Función para cargar el progreso
function loadProgress() {
  const savedResources = localStorage.getItem('resources');
  const savedMachines = localStorage.getItem('machines');
  if (savedResources && savedMachines) {
      resources = JSON.parse(savedResources);
      machines = JSON.parse(savedMachines);
      updateResourceCount();
      updateMachineCount();
      updateMachineCost();
  }
}

// Llamar a la función loadProgress cuando se carga la página
window.addEventListener('load', loadProgress);

// Guardar el progreso automáticamente cada 10 segundos
setInterval(saveProgress, 10000);

// Actualizar contadores de recursos
function updateResourceCount() {
  document.getElementById('air-count').textContent = resources.air.toFixed(2);
  document.getElementById('fire-count').textContent = resources.fire.toFixed(2);
  document.getElementById('water-count').textContent = resources.water.toFixed(2);
  document.getElementById('earth-count').textContent = resources.earth.toFixed(2);
  document.getElementById('lava-count').textContent = resources.lava.toFixed(2);
}

function updateMachineCount() {
  document.getElementById('machine-air-count').textContent = machines.air.count;
  document.getElementById('machine-fire-count').textContent = machines.fire.count;
  document.getElementById('machine-water-count').textContent = machines.water.count;
  document.getElementById('machine-earth-count').textContent = machines.earth.count;
  document.getElementById('machine-lava-count').textContent = machines.lava.count;
}

function updateMachineCost() {
  document.getElementById('buy-machine-air-cost').textContent = machines.air.cost;
  document.getElementById('buy-machine-fire-cost').textContent = machines.fire.cost;
  document.getElementById('buy-machine-water-cost').textContent = machines.water.cost;
  document.getElementById('buy-machine-earth-cost').textContent = machines.earth.cost;
  document.getElementById('buy-machine-lava-cost').textContent = machines.lava.cost;
}

function updateResourcePerSecond(type) {
  document.getElementById(`${type}-per-second`).textContent = (machines[type].perSecond+' /s');
}

// Recolectar recursos con animación y control de sonido
function collectResource(type) {
  const currentTime = Date.now();
  resources[type] += 0.8;
  updateResourceCount();


  playSound(sounds.collect);

  // Crear animación con limitación de frecuencia
  if (currentTime - lastAnimationTime >= animationDelay) {
      createResourceAnimation(`Recolectaste ${type.charAt(0).toUpperCase() + type.slice(1)}`);
      lastAnimationTime = currentTime;
  }
  saveProgress();
}

document.getElementById('collect-air-button').addEventListener('click', () => collectResource('air'));
document.getElementById('collect-fire-button').addEventListener('click', () => collectResource('fire'));
document.getElementById('collect-water-button').addEventListener('click', () => collectResource('water'));
document.getElementById('collect-earth-button').addEventListener('click', () => collectResource('earth'));
document.getElementById('collect-lava-button').addEventListener('click', () => collectResource('lava'));
document.getElementById('limpiar-local').addEventListener('click', () => limpiarStorage());

// Comprar máquinas
function buyMachine(type) {
  const machine = machines[type];
  const currentTime = Date.now();
  if (resources[type] >= machine.cost && machine.count < machine.max) {
      resources[type] -= machine.cost;
      machine.count += 1;
      machine.cost = Math.floor(machine.cost * 1.5); // Incremento de costo
      if (machine.count !== 1) {
          machine.perSecond *= 2;
      }

      updateResourceCount();
      updateMachineCount();
      updateMachineCost();
      updateResourcePerSecond(type);

      playSound(sounds.machine);

      saveProgress();
  }
}

document.getElementById('buy-machine-air-button').addEventListener('click', () => buyMachine('air'));
document.getElementById('buy-machine-fire-button').addEventListener('click', () => buyMachine('fire'));
document.getElementById('buy-machine-water-button').addEventListener('click', () => buyMachine('water'));
document.getElementById('buy-machine-earth-button').addEventListener('click', () => buyMachine('earth'));
document.getElementById('buy-machine-lava-button').addEventListener('click', () => buyMachine('lava'));

// Generar recursos a intervalos
let updatesPerSecond = 10;
setInterval(function() {
  resources.air += (machines.air.count * machines.air.perSecond) / updatesPerSecond;
  resources.fire += (machines.fire.count * machines.fire.perSecond) / updatesPerSecond;
  resources.water += (machines.water.count * machines.water.perSecond) / updatesPerSecond;
  resources.earth += (machines.earth.count * machines.earth.perSecond) / updatesPerSecond;
  resources.lava += (machines.lava.count * machines.lava.perSecond) / updatesPerSecond;
  updateResourceCount();
}, 1000 / updatesPerSecond);

// Crear animación de recolección
function createResourceAnimation(text) {
  const animation = document.createElement('div');
  animation.classList.add('resource-animation');
  animation.textContent = text;
  document.getElementById('animations').appendChild(animation);

  setTimeout(() => {
      animation.remove();
  }, 1000);
}

function limpiarStorage(){
  localStorage.clear();
  createResourceAnimation("Eliminacion de recursos");

  setTimeout(() => {
    createResourceAnimation("Reiniciando...");
    location.reload();
  }, 1000);
}
