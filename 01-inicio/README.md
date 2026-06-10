<!-- NAV: adapta los paths según la profundidad del archivo (../) -->
<div align="center">

<table><tr>
<td><a href="../README.md">🏠 Inicio</a></td>
<td><b>·</b></td>
<td><a href="../01-inicio/README.md"
   style="background:#dbeafe;padding:4px 10px;border-radius:12px;color:#1d4ed8;font-weight:bold;text-decoration:none">
   📋 01 · Inicio</a></td>
<td><b>·</b></td>
<td><a href="../02-elaboracion/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🔬 02 · Elaboración</a></td>
<td><b>·</b></td>
<td><a href="../03-construccion/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🔨 03 · Construcción</a></td>
<td><b>·</b></td>
<td><a href="../04-transicion/README.md"
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

[📌 Visión y Justificación](../01-inicio/vision-justificacion/README.md)<br>
[🧩 Modelo del Dominio](../01-inicio/modelo-dominio/README.md)<br>
[👥 Actores y CU alto nivel](../01-inicio/casos-de-uso-alto-nivel/README.md)<br>
[⚠️ Análisis de Riesgos](../01-inicio/analisis-riesgos/README.md)<br>
[📖 Glosario](../01-inicio/glosario/README.md)

</td>
<td valign="top">

[🏗️ Arquitectura del Sistema](../02-elaboracion/arquitectura/README.md)<br>
[🔄 Diagramas de Estado](../02-elaboracion/diagramas-estado/README.md)<br>
[📝 Casos de Uso Detallados](../02-elaboracion/casos-de-uso-detallados/README.md)<br>
[⚖️ Priorización de CU](../02-elaboracion/priorizacion-cu/README.md)<br>
[📋 Requisitos RF/RNF](../02-elaboracion/requisitos/README.md)

</td>
<td valign="top">

[🎨 Diseño por Caso de Uso](../03-construccion/diseno-por-caso-de-uso/README.md)<br>
[📦 Análisis de Paquetes](../03-construccion/analisis-paquetes/README.md)<br>
[🗄️ Base de Datos](../03-construccion/base-de-datos/README.md)<br>
[🤖 Robot UiPath](../03-construccion/robot-uipath/README.md)<br>
[💻 Descripción Solución](../03-construccion/descripcion-solucion/README.md)<br>
[⚙️ Instalación](../03-construccion/instalacion/README.md)

</td>
<td valign="top">

[🧪 Plan de Pruebas](../04-transicion/plan-pruebas/README.md)<br>
[🖥️ CU en Interfaz](../04-transicion/cu-en-interfaz/README.md)<br>
[📊 Resultados y Métricas](../04-transicion/resultados-metricas/README.md)<br>
[🎓 Conclusiones](../04-transicion/conclusiones/README.md)

</td>
</tr>
</table>

</details>

<sub>📍 Estás en: <b>01 · Inicio</b></sub>

</div>

***

# Fase 1: Inicio

La fase de Inicio tiene como objetivo establecer la visión del proyecto, identificar los riesgos principales y definir el alcance inicial del sistema de automatización RPA para Maflow.

## 📋 Contenido de esta fase

En esta sección se detallan los siguientes artefactos:

1.  **[📌 Visión y Justificación](./vision-justificacion/README.md)**: Análisis del problema actual en Maflow y la solución propuesta.
2.  **[🧩 Modelo del Dominio](./modelo-dominio/README.md)**: Identificación de las entidades clave y sus relaciones.
3.  **[👥 Actores y Casos de Uso de Alto Nivel](./casos-de-uso-alto-nivel/README.md)**: Quiénes interactúan con el sistema y qué funciones principales realizan.
4.  **[⚠️ Análisis de Riesgos](./analisis-riesgos/README.md)**: Identificación de amenazas técnicas y operativas (especialmente críticas en RPA).
5.  **[📖 Glosario](./glosario/README.md)**: Definición de términos técnicos y de negocio específicos del proyecto.

## 🎯 Objetivos Alcanzados

- [x] Identificación de la ineficiencia en la generación de documentos Galia (~2 min/doc).
- [x] Definición de la arquitectura en 4 capas para solventar la falta de APIs en SAP.
- [x] Modelado de las 8 entidades principales del dominio.
- [x] Análisis de riesgos enfocado en la fragilidad de la GUI y el bloqueo de cuentas SAP.
