<!-- NAV: adapta los paths según la profundidad del archivo (../) -->
<div align="center">

<table><tr>
<td><a href="../README.md">🏠 Inicio</a></td>
<td><b>·</b></td>
<td><a href="../01-inicio/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   📋 01 · Inicio</a></td>
<td><b>·</b></td>
<td><a href="../02-elaboracion/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🔬 02 · Elaboración</a></td>
<td><b>·</b></td>
<td><a href="../03-construccion/README.md"
   style="background:#dbeafe;padding:4px 10px;border-radius:12px;color:#1d4ed8;font-weight:bold;text-decoration:none">
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

<sub>📍 Estás en: <b>03 · Construcción</b></sub>

</div>

***

# Fase 3: Construcción

La fase de Construcción materializa los diseños en código ejecutable. Aquí se detalla la implementación de la base de datos, la lógica del robot UiPath y el desarrollo de la interfaz web React.

## 🔨 Contenido de esta fase

En esta sección se detallan los siguientes artefactos:

1.  **[🎨 Diseño por Caso de Uso](./diseno-por-caso-de-uso/README.md)**: Artefactos MVC (clases, secuencia y mockups) para los CU prioritarios.
2.  **[📦 Análisis de Paquetes](./analisis-paquetes/README.md)**: Estructura de directorios del frontend, backend y procesos RPA.
3.  **[🗄️ Base de Datos](./base-de-datos/README.md)**: Esquema de tablas en SQL Server y relaciones con el sistema MES.
4.  **[🤖 Robot UiPath](./robot-uipath/README.md)**: Flujo lógico detallado del robot y gestión de errores críticos.
5.  **[💻 Descripción Solución](./descripcion-solucion/README.md)**: Guía visual de los 4 módulos principales implementados.
6.  **[⚙️ Instalación](./instalacion/README.md)**: Guía técnica para desplegar el sistema en el entorno de planta.

## 🎯 Objetivos Alcanzados

- [x] Implementación del esquema SQL Server compartido con MES Apriso.
- [x] Desarrollo de los flujos de login, procesamiento y cambio de password en UiPath.
- [x] Creación de los módulos de Declaración, Log y Usuarios en React/Node.js.
- [x] Validación del flujo completo: Interfaz -> API -> BD -> Robot -> SAP.
