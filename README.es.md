# Cuentas Claras

<p align="center"><a href="README.md">English</a> · <b>Español</b></p>

**App de finanzas personales para llevar tus gastos, ingresos, ahorros, tarjetas de crédito y deudas en un solo lugar.** Se instala en el teléfono como una app nativa, funciona sin internet y guarda tus datos en tu dispositivo: sin cuenta, sin servidor y sin anuncios.

🔗 **App en vivo:** [cuentas-two-rust.vercel.app](https://cuentas-two-rust.vercel.app) (toca "Ver con datos de ejemplo" para explorarla con datos de prueba)

<p align="center">
  <img src="docs/screenshots/summary.jpg" alt="Resumen del mes" width="260">
  <img src="docs/screenshots/debt-plan.jpg" alt="Plan para pagar deudas" width="260">
  <img src="docs/screenshots/analysis.jpg" alt="Ritmo de gasto" width="260">
</p>

## Qué hace

- **Resumen del mes**: cuánto llevas gastado, ganado y ahorrado, escrito como un cheque, con una proyección de cómo cerrarás el mes a tu ritmo actual.
- **Registro de movimientos** con búsqueda y filtros por tipo, categoría y método de pago, en el mes actual o en todos los meses.
- **Escaneo de facturas**: tomas una foto del ticket y la app lee el monto, la fecha y el comercio. La lectura (OCR) corre **dentro del navegador**, así que la foto nunca sale de tu teléfono.
- **Control de ahorros**: saldo inicial y cambio mes a mes.
- **Tarjetas de crédito**: deuda actual, porcentaje de uso del límite, el interés que pagarías si no la saldas, y lo gastado y pagado con cada tarjeta.
- **Deudas y compras a cuotas**: préstamos y compras en cuotas con su cuota mensual, saldo pendiente, intereses y fecha en que terminas.
- **Plan para terminar antes**: con un control de "pago extra al mes" ves cuánto antes terminas y cuánto ahorras en intereses, comparando el método **avalancha** (primero la de mayor interés) con el de **bola de nieve** (primero la más pequeña).
- **Análisis**: ritmo de gasto del mes comparado con el anterior, predicción para fin de mes según tus últimos tres meses, y gasto por categoría con alertas cuando una va por encima de su promedio.
- **Categorías con límite mensual**, exportación a CSV y tema claro y oscuro.

## Capturas

| | | |
|:---:|:---:|:---:|
| <img src="docs/screenshots/transactions.jpg" width="240"><br>**Registro de movimientos** | <img src="docs/screenshots/new-expense.jpg" width="240"><br>**Nuevo gasto** con escaneo de factura | <img src="docs/screenshots/cards.jpg" width="240"><br>**Tarjetas de crédito** |
| <img src="docs/screenshots/debts.jpg" width="240"><br>**Control de deudas** y gráfica de pago | <img src="docs/screenshots/forecast.jpg" width="240"><br>**Predicción de fin de mes** | |

## Cómo está hecha

Una **Progressive Web App** de una sola página escrita en HTML, CSS y JavaScript, sin framework y sin paso de compilación.

| Área | Cómo |
| --- | --- |
| Sin internet e instalación | Service Worker que guarda la app en caché; Web App Manifest con íconos adaptables para instalarla en Android e iOS |
| Almacenamiento | Los datos quedan en el dispositivo, en `localStorage`, e IndexedDB para las fotos de facturas |
| Lectura de facturas | [Tesseract.js](https://tesseract.projectnaptha.com/), que se carga solo cuando se usa y corre en el navegador |
| Gráficas | SVG hecho a mano |
| Temas | Variables CSS con modo claro y oscuro automático |
| Hosting | Archivos estáticos en Vercel |

Como no hay servidor, no hay que registrarse y no hay nada que se pueda filtrar: todo lo que anotas se queda en tu navegador. Puedes exportar a CSV cuando quieras una copia.

## Cómo correrla localmente

No hay nada que instalar. Sirve la carpeta con cualquier servidor estático:

```bash
git clone https://github.com/js3rr4n0/Cuentas.git
cd Cuentas
python3 -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000). Los Service Workers necesitan `localhost` o HTTPS, así que abrir `index.html` directo desde el disco no activa el modo sin internet.

---

Desarrollado por **Julio César Serrano Sandoval** · [LinkedIn](https://www.linkedin.com/in/julioserrasand/)
