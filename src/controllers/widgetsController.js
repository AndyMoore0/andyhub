// src/controllers/widgetsController.js

// Obtiene clima usando Open-Meteo (SIN API KEY)
const getWeather = async () => {
  // Coordenadas de Bahía Blanca
  const lat = -38.717;
  const lon = -62.2667;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !data.current_weather) {
    console.error('❌ Error de Open-Meteo:', response.status, data);
    throw new Error('Falló la llamada a Open-Meteo');
  }

  const temp = Math.round(data.current_weather.temperature);
  const wind = data.current_weather.windspeed;

  return {
    city: 'Bahía Blanca',
    temp,
    description: `Temp actual, viento ${wind} km/h`
  };
};

const getWidgets = async (req, res) => {
  try {
    const weather = await getWeather();

    const payload = {
      user: { name: 'Andy' },
      weather,
      tasks: [
        { id: 1, text: 'Mejorar README del bot de Telegram', done: false },
        { id: 2, text: 'Agregar capturas al sistema de reservas', done: true }
      ],
      notes: [
        'Idea: crear API simple con Express',
        'Recordar actualizar el CV con el GitHub nuevo'
      ]
    };

    res.json(payload);
  } catch (error) {
    console.error('Error obteniendo widgets:', error);

    // Fallback amigable
    res.json({
      user: { name: 'Andy' },
      weather: {
        city: 'Desconocido',
        temp: 0,
        description: 'No se pudo obtener el clima real'
      },
      tasks: [],
      notes: ['Error al obtener datos de clima. Revisar conexión.']
    });
  }
};

module.exports = { getWidgets };
