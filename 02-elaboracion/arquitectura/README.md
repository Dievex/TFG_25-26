<!-- NAV: adapta los paths según la profundidad del archivo (../../) -->
<div align="center">

<table><tr>
<td><a href="../../README.md">🏠 Inicio</a></td>
<td><b>·</b></td>
<td><a href="../../01-inicio/README.md"
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   📋 01 · Inicio</a></td>
<td><b>·</b></td>
<td><a href="../../02-elaboracion/README.md"
   style="background:#dbeafe;padding:4px 10px;border-radius:12px;color:#1d4ed8;font-weight:bold;text-decoration:none">
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

<sub>📍 Estás en: <b>Arquitectura del Sistema</b></sub>

</div>

***

# 🏗️ Arquitectura del Sistema

La arquitectura se ha diseñado para solventar la restricción técnica de no poseer APIs en SAP, utilizando una estructura de 4 capas que aísla la complejidad de la automatización.

## Las 4 Capas de la Solución

1.  **Capa de Presentación (React):** Interfaz web moderna para los distintos actores (Operario, Responsable, Administrador). Se comunica con el backend mediante una API REST.
2.  **Capa de Lógica de Negocio (Node.js/Express):** Gestiona la lógica, autenticación, coordinación de la BD y el disparo de las ejecuciones del robot.
3.  **Capa de Persistencia (MS SQL Server):** Almacena registros, logs y configuraciones. Comparte instancia con el MES de la planta por requerimientos de infraestructura.
4.  **Capa de Automatización (UiPath):** El componente "manos" del sistema. Interactúa con la GUI de SAP de forma autónoma.

## Patrón MVC Aplicado

El sistema sigue estrictamente el patrón **Modelo-Vista-Controlador**:
- **Modelo:** Entidades del dominio y lógica de acceso a datos.
- **Vista:** Interfaces React específicas por actor y vistas primitivas de datos.
- **Controlador:** Endpoints de Node.js que orquestan los casos de uso.

![Arquitectura 4 Capas](./diagramas/arquitectura-4-capas.png)
*Figura 3: Diagrama de arquitectura física y lógica del sistema. 📌 Sube el diagrama correspondiente del PDF a esta carpeta como `arquitectura-4-capas.png`*

## Principio de Aislamiento
Cualquier cambio en la interfaz gráfica de SAP (actualizaciones de versión, cambios de campos) solo afecta a la **Capa de Automatización**. La interfaz web y la lógica de negocio permanecen inalteradas, garantizando un mantenimiento sostenible.
