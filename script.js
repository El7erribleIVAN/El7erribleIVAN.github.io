let resources = {
    air: 0,
    fire: 0,
    water: 0,
    earth: 0,
    lava: 0
  };
  
  let machines = {
    air: { count: 0, cost: 10, max: 5, perSecond: 0.1 },
    fire: { count: 0, cost: 20, max: 3, perSecond: 0.2 },
    water: { count: 0, cost: 15, max: 4, perSecond: 0.15 },
    earth: { count: 0, cost: 25, max: 6, perSecond: 0.3 },
    lava: { count: 0, cost: 30, max: 2, perSecond: 0.5 }
  };
  
  
  // Actualiza los contadores en pantalla
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

  function updateResourcePerSecond(tipoderecurso) {
    if (tipoderecurso == "air"){
      document.getElementById('air-per-second').textContent = machines.air.perSecond;
    } else if (tipoderecurso == "fire") {
      document.getElementById('fire-per-second').textContent = machines.fire.perSecond;
    } else if (tipoderecurso == "water") {
      document.getElementById('water-per-second').textContent = machines.water.perSecond;
    } else if (tipoderecurso == "earth") {
      document.getElementById('earth-per-second').textContent = machines.earth.perSecond;
    } else {
      document.getElementById('lava-per-second').textContent = machines.lava.perSecond;
    }
  }
  
  // Recolectar recursos con animación
  document.getElementById('collect-air-button').addEventListener('click', function() {
    resources.air += 0.1;
    updateResourceCount();
    createResourceAnimation('Recolectaste Air');
  });
  
  document.getElementById('collect-fire-button').addEventListener('click', function() {
    resources.fire += 0.1;
    updateResourceCount();
    createResourceAnimation('Recolectaste Fire');
  });
  
  document.getElementById('collect-water-button').addEventListener('click', function() {
    resources.water += 0.1;
    updateResourceCount();
    createResourceAnimation('Recolectaste Water');
  });
  
  document.getElementById('collect-earth-button').addEventListener('click', function() {
    resources.earth += 0.1;
    updateResourceCount();
    createResourceAnimation('Recolectaste Earth');
  });
  
  document.getElementById('collect-lava-button').addEventListener('click', function() {
    resources.lava += 0.1;
    updateResourceCount();
    createResourceAnimation('Recolectaste Lava');
  });
  
  // Comprar máquinas
  function buyMachine(type) {
    const machine = machines[type];
    if (resources[type] >= machine.cost && machine.count < machine.max) {
      resources[type] -= machine.cost;
      machine.count += 1;
      machine.cost = Math.floor(machine.cost * 1.5); // Incremento de costo
      if (machine.count != 1){
        machine.perSecond *= 2
      }
      else{
        
      }
      updateResourceCount();
      updateMachineCount();
      updateMachineCost();
      updateResourcePerSecond(type);
    }
  }
  
  document.getElementById('buy-machine-air-button').addEventListener('click', function() {
    buyMachine('air');
  });
  
  document.getElementById('buy-machine-fire-button').addEventListener('click', function() {
    buyMachine('fire');
  });
  
  document.getElementById('buy-machine-water-button').addEventListener('click', function() {
    buyMachine('water');
  });
  
  document.getElementById('buy-machine-earth-button').addEventListener('click', function() {
    buyMachine('earth');
  });
  
  document.getElementById('buy-machine-lava-button').addEventListener('click', function() {
    buyMachine('lava');
  });
  
// Número de actualizaciones por segundo (10 en este caso, es decir, cada 100ms)
let updatesPerSecond = 10;

// Generar recursos
setInterval(function() {
  resources.air += (machines.air.count * machines.air.perSecond) / updatesPerSecond;
  resources.fire += (machines.fire.count * machines.fire.perSecond) / updatesPerSecond;
  resources.water += (machines.water.count * machines.water.perSecond) / updatesPerSecond;
  resources.earth += (machines.earth.count * machines.earth.perSecond) / updatesPerSecond;
  resources.lava += (machines.lava.count * machines.lava.perSecond) / updatesPerSecond;
  updateResourceCount();
}, 1000 / updatesPerSecond);

  
  // Crear una animación cuando se recolecta un recurso
  function createResourceAnimation(text) {
    const animation = document.createElement('div');
    animation.classList.add('resource-animation');
    animation.textContent = text;
    document.getElementById('animations').appendChild(animation);
  
    setTimeout(() => {
      animation.remove();
    }, 1000);
  }
  