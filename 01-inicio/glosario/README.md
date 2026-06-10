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

<sub>📍 Estás en: <b>Glosario</b></sub>

</div>

***

# 📖 Glosario de Términos

Este glosario define los conceptos clave, técnicos y de negocio, utilizados a lo largo de todo el proyecto TFG.

| Término | Definición |
|---------|------------|
| **Galia / ETI 9** | Documento físico de trazabilidad que acompaña a cada lote de piezas. Es el producto final del proceso automatizado. |
| **RPA** | *Robotic Process Automation*. Tecnología que automatiza tareas repetitivas sobre interfaces gráficas sin necesidad de APIs. |
| **SAP** | ERP corporativo utilizado en Maflow para la declaración de producción y envío de Galias a imprimir. |
| **MES** | *Manufacturing Execution System*. Sistema externo de gestión de producción en planta. En Maflow se utiliza **Apriso**. |
| **Puesto de Trabajo** | Ubicación física en la línea de producción. Determina el usuario SAP del robot y la impresora destino. |
| **Referencia** | Código identificador de una pieza o producto fabricado. |
| **Orden de Fabricación** | Instrucción de producción abierta en SAP para una referencia concreta en un puesto determinado. |
| **Declaración de producción** | Registro en SAP de las unidades fabricadas. Antes manual, ahora automatizado mediante RPA. |
| **Operario** | Usuario final que introduce datos en la interfaz web sin necesidad de acceder a SAP ni al MES. |
| **Interfaz Web** | Aplicación React/Node que conecta con el MES para obtener datos y persiste los registros en la BD. |
| **Registro** | Unidad de información (puesto + referencia + orden + cantidad). Estados: 0=sin procesar, 1=completado, 2=error. |
| **Robot RPA** | Proceso UiPath activado por HTTP que lee la BD, se loguea en SAP y completa la declaración. |
| **Cambio de contraseña** | Mecanismo autónomo que detecta si han pasado ≥28 días y renueva la contraseña de SAP. |
| **Estado de Galia** | Indicador del progreso: 0=pendiente, 1=completada correctamente, 2=error en SAP. |
| **TRL** | *Technology Readiness Level*. Nivel de madurez tecnológica. El objetivo de este proyecto es alcanzar un **TRL 5-6**. |
