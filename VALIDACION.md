# Verificación de la entrega — 24/10/2026

Base publicada: commit eed1c25a3a76328ce774d880d3c547d5f9d77efd del repositorio indicado. El HTML descargado del enlace coincide con el index del repositorio.

- 27 pruebas automatizadas de catálogo, reloj, audio, mezclador de grabación, recompensas, migración y playlist: aprobadas.
- Prueba real en navegador Chromium, viewport móvil 390 × 844: aprobada.
- Aviso inicial: cancelar no inicia sesión; aceptar requiere checkbox; la aceptación persiste tras recargar.
- Navegación de Inicio, Actividad, Técnica, Grabación y Trofeos: operativa.
- Música: reproducción, pausa y reanudación verificadas; se conserva el mismo elemento y grafo de mezcla para grabación.
- Sesión completada y registros de actividad/recompensas: verificados.
- Grabación: cámara simulada, MediaRecorder real, video generado de más de 800 KB con pista audiovisual. No es una prueba con cámara física.
- Borrado de datos: elimina aceptación y datos propios, incluidos remanentes de progreso del modo retirado, sin eliminar una clave de otra app.
- Página legal en móvil y escritorio: sin desbordamiento horizontal.
- Inspección visual: footer, aviso de consentimiento y página legal móvil.
- Música, cuatro bancos de voz, imágenes de marca, catálogo/reloj y lógica de recompensas: idénticos a los originales mediante comparación SHA-256.
- Archivos y recursos del campeonato excluidos; no se incorpora historial Git al ZIP.

## Límites
No se ha publicado ni modificado el repositorio remoto. No se probaron dispositivos iOS/Android físicos, la hoja nativa de compartir ni un dominio propio aún no elegido. No se acreditan licencias ni disponibilidad de marca. Los datos legales pendientes están señalados en la configuración y en la página legal. La música original se mantiene por solicitud expresa, no por considerarla libre de derechos.
