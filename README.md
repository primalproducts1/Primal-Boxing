# PRIMAL Boxing — versión sin campeonato

Base: copia del repositorio público que coincide con la página indicada, consultada el 24/10/2026.
Se conserva el entrenamiento publicado: tiempos, combos, voz, grabación, música, historial y trofeos. No se incorporan otras correcciones de paquetes posteriores.

## Qué se entrega
- Campeonato, rivales, retratos y narraciones eliminados del paquete.
- Footer con términos, privacidad, seguridad, derechos y contacto.
- Aviso de aceptación antes del primer entrenamiento (mayores de 18 años).
- Gestión para borrar los datos locales de PRIMAL; no borra archivos del dispositivo.
- Referencias promocionales a otras marcas y nombres antiguos retiradas del código.
- Las menciones a proveedores necesarias para explicar el tratamiento de datos se mantienen en privacidad.
- Música original conservada expresamente a petición del propietario. NO se certifican sus derechos.
- Playlist editable manteniendo el mismo reproductor y la misma mezcla con el video.
- Enlaces de compartir trofeos adaptados al dominio desde el que se abre la app.

## Antes de publicar: pendientes reales
1. En `legal-config.js`, completa `legalName` con el nombre de la persona o razón social responsable y `notificationAddress` con su dirección válida de notificaciones. El nombre público solicitado es `primalproducts1` y el correo es `primalproducts1@gmail.com`. El alias no prueba identidad legal. No se inventaron estos datos.
2. Sustituye la música antes de exponer el paquete al público, salvo que cuentes con autorización suficiente. La música actual se conserva para pruebas por solicitud expresa. Una etiqueta «sin copyright» no equivale a autorización para redistribuir un MP3 ni incluirlo en videos.
3. Conserva pruebas de derechos/licencias de música, voz pregrabada, imágenes y marca. El repositorio no contiene una acreditación suficiente de esos derechos. Mantener los recursos o quitar nombres no los convierte en originales ni libres de derechos.
4. Verifica antecedentes de marca y las condiciones de los servicios utilizados; comprar un dominio no concede derechos de marca. Revisión jurídica recomendada para identidad, privacidad, proveedores y licencias antes del lanzamiento. No hay certificación ni blindaje absoluto.
5. Revisa las instrucciones de publicación y realiza una prueba en tus dispositivos, incluida grabación y compartir.

## Publicar el ZIP en el repositorio
1. Descomprime. `index.html` debe quedar en la raíz de la carpeta publicada, no dentro de una carpeta adicional.
2. Sustituye los archivos de la versión anterior por estos. IMPORTANTE: subir encima no elimina recursos antiguos. Retira de la versión publicada los antiguos archivos y carpetas de campeonato (JS, CSS, retratos y narraciones). Si no quieres conservar acceso a recursos antiguos, revisa también el historial público y copias del repositorio. Este ZIP no modifica ni borra lo ya publicado.
3. Publica con GitHub Pages desde la rama/carpeta elegidas. Esta versión no requiere backend, instalación ni claves API.
4. Activa HTTPS. Para dominio propio, configura el dominio en Pages y los registros DNS que indique GitHub. No se incluye CNAME porque no se ha elegido un dominio. Los enlaces y recursos usan rutas relativas.
5. Comprueba términos, correo, reproducción, pausa, voz, grabación y descarga desde el dominio final.

## Cambiar la música
Una canción: reemplaza `audio/primal-background.mp3` por un MP3 autorizado con el mismo nombre.
Varias canciones: añade MP3 en `audio/` con nombres como `pista-02.mp3`; en `music-playlist.js`, añade las rutas al array. Se reproducen en orden y vuelven a la primera. La pausa, el volumen y la mezcla del video siguen usando el mismo elemento de audio. Los archivos han de ser MP3 normales, no descargas cifradas de plataformas. No subas documentos privados de licencia al repositorio público.

## Privacidad y migración
Los ajustes antiguos se reconocen por su estructura y se copian al nuevo espacio de nombres en el mismo origen. Los datos originales se conservan hasta que el usuario decide borrarlos. Los registros de trofeos conservan su clave. Al cambiar de dominio, los datos locales no se trasladan automáticamente. No se añade analítica, publicidad, formulario remoto ni carga de videos.
Los textos legales están en español; los controles de aviso y privacidad acompañan el idioma ES/EN y señalan que los documentos están en español.

## Pruebas locales
`npm test` ejecuta las pruebas de lógica y audio. `npm start` sirve la app en http://localhost:3000.
Para las pruebas de navegador se necesita Playwright y Chromium: `node tests/legal-browser.cjs`.
Los permisos y exportación deben comprobarse también en el dispositivo final. Las pruebas sintéticas no sustituyen una prueba física de cámara en iOS/Android.

## Fuentes normativas consultadas
- Ley 1581 de 2012: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981
- Decreto 1377 de 2013: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646 (ver compilación y vigencia aplicable).
- SIC, marcas: https://sedeelectronica.sic.gov.co/temas/propiedad-industrial/marcas-y-otros-signos-distintivos/marcas

## Licencias
No se añade una licencia de código abierto ni se atribuye al operador la propiedad de todos los recursos sin documentación. Revisa la procedencia y obligaciones de cada recurso antes de redistribuir. Los pasos y secuencias genéricas de boxeo no se presentan como exclusivos. Los archivos de audio de voz existentes se conservaron sin cambios.
