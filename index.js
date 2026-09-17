const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de productos funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

let productos = [
  { id: 1, nombre: 'Teclado mecánico', precio: 180000 },
  { id: 2, nombre: 'Mouse inalámbrico', precio: 75000 }
];
let siguienteId = 3;

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'nombre y precio son obligatorios' });
  }
  const nuevo = { id: siguienteId++, nombre, precio };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

app.put('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  const { nombre, precio } = req.body;
  if (nombre !== undefined) producto.nombre = nombre;
  if (precio !== undefined) producto.precio = precio;
  res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
  const indice = productos.findIndex(p => p.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  productos.splice(indice, 1);
  res.status(204).send();
});