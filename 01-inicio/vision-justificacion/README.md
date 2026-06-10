<!-- NAV: adapta los paths según la profundidad del archivo (../../) -->
<div align="center">

<table><tr>
<td><a href="../../README.md">🏠 Inicio</a></td>
<td><b>·</b></td>
<td><a href="../../01-inicio/README.md"
   style="background:#dbeafe;padding:4px 10px;border-radius:12px;color:#1d4ed8;font-weight:bold;text-decoration:none">
   📋 01 · Inicio</a></td>
<td><b>·</b></td>
<td><a href="../../02-elaboracion/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🔬 02 · Elaboración</a></td>
<td><b>·</b></td>
<td><a href="../../03-construccion/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🔨 03 · Construcción</a></td>
<td><b>·</b></td>
<td><a href="../../04-transicion/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🚀 04 · Transición</a></td>
</tr></table>

<details>
<summary>📋 Ver todas las secciones del repositorio</summary>

<br>

<table>
<tr><th>📋 01 · Inicio</th><th>🔬 02 · Elaboración</th><th>🔨 03 · Construcción</th><th>🚀 04 · Transición</th></tr>
<tr>
<td valign="top">

[📌 Visión y Justificación](../../01-inicio/vision-justificacion/README.md)<br>
[🧩 Modelo del Dominio](../../01-inicio/modelo-dominio/README.md)<br>
[👥 Actores y CU alto nivel](../../01-inicio/casos-de-uso-alto-nivel/README.md)<br>
[⚠️ Análisis de Riesgos](../../01-inicio/analisis-riesgos/README.md)<br>
[📖 Glosario](../../01-inicio/glosario/README.md)

</td>
<td valign="top">

[🏗️ Arquitectura del Sistema](../../02-elaboracion/arquitectura/README.md)<br>
[🔄 Diagramas de Estado](../../02-elaboracion/diagramas-estado/README.md)<br>
[📝 Casos de Uso Detallados](../../02-elaboracion/casos-de-uso-detallados/README.md)<br>
[⚖️ Priorización de CU](../../02-elaboracion/priorizacion-cu/README.md)<br>
[📋 Requisitos RF/RNF](../../02-elaboracion/requisitos/README.md)

</td>
<td valign="top">

[🎨 Diseño por Caso de Uso](../../03-construccion/diseno-por-caso-de-uso/README.md)<br>
[📦 Análisis de Paquetes](../../03-construccion/analisis-paquetes/README.md)<br>
[🗄️ Base de Datos](../../03-construccion/base-de-datos/README.md)<br>
[🤖 Robot UiPath](../../03-construccion/robot-uipath/README.md)<br>
[💻 Descripción Solución](../../03-construccion/descripcion-solucion/README.md)<br>
[⚙️ Instalación](../../03-construccion/instalacion/README.md)

</td>
<td valign="top">

[🧪 Plan de Pruebas](../../04-transicion/plan-pruebas/README.md)<br>
[🖥️ CU en Interfaz](../../04-transicion/cu-en-interfaz/README.md)<br>
[📊 Resultados y Métricas](../../04-transicion/resultados-metricas/README.md)<br>
[🎓 Conclusiones](../../04-transicion/conclusiones/README.md)

</td>
</tr>
</table>

</details>

<sub>📍 Estás en: <b>Visión y Justificación</b></sub>

</div>

***

# 📌 Visión y Justificación

## Problema detectado en Maflow Spain Automotive
El proceso de generación de documentos **Galia (ETI 9)** en SAP presenta graves deficiencias operativas:
- **Lentitud extrema:** El proceso manual consume aproximadamente 2 minutos por cada documento.
- **Duplicidad de esfuerzo:** Los operarios introducen los mismos datos manualmente tanto en SAP como en el sistema MES (Apriso).
- **Restricción técnica:** La ausencia de acceso a APIs de SAP impide el uso de métodos de integración convencionales.
- **Falta de escalabilidad:** No existe capacidad de procesamiento en lote; cada documento debe generarse de forma individual.
- **Riesgo de calidad:** Los errores de transcripción manual afectan negativamente la trazabilidad entre Maflow y sus clientes OEM.

## Solución Propuesta
Se ha desarrollado una solución basada en **RPA (Robotic Process Automation)** que opera directamente sobre la SAP GUI, superando la limitación de falta de APIs.

### Arquitectura de la Solución
El sistema se estructura en 4 capas diferenciadas:
1.  **Presentación (React):** Interfaz amigable para el operario.
2.  **Lógica de Negocio (Node.js/Express):** Coordina las peticiones y la base de datos.
3.  **Persistencia (SQL Server):** Almacena registros y estados, compartida con el MES.
4.  **Automatización (UiPath):** Robot que ejecuta las acciones en SAP GUI.

### Flujo de Trabajo
1. El operario introduce los datos en la **Interfaz Web**.
2. Al pulsar **Guardar**, los datos se persisten en la BD y se declaran en el sistema MES.
3. Al pulsar **Enviar a SAP**, se activa el robot UiPath.
4. El robot se loguea en SAP y procesa en lote todos los registros pendientes (estado 0).

## Objetivos del Proyecto
- **General:** Reducción mínima del 80% del tiempo de dedicación manual por documento.
- **Procesamiento:** Capacidad de gestionar al menos 20 Galias en un único lote.
- **Calidad:** Eliminación del 95% de los errores de transcripción.
- **Madurez:** Alcanzar un nivel TRL (Technology Readiness Level) de 5-6.
