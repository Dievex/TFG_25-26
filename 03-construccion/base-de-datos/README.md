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
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🔬 02 · Elaboración</a></td>
<td><b>·</b></td>
<td><a href="../../03-construccion/README.md"
   style="background:#dbeafe;padding:4px 10px;border-radius:12px;color:#1d4ed8;font-weight:bold;text-decoration:none">
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

<sub>📍 Estás en: <b>Base de Datos</b></sub>

</div>

***

# 🗄️ Base de Datos

El sistema utiliza Microsoft SQL Server como motor de persistencia, compartiendo instancia con el sistema MES Apriso de la planta.

## Modelo Entidad-Relación

El diseño de la base de datos se centra en la trazabilidad de las declaraciones y la gestión de credenciales por puesto de trabajo.

![Esquema Base de Datos](./diagramas/esquema-bbdd.png)
*Figura 7: Diagrama del modelo físico de datos. 📌 Sube el diagrama correspondiente del PDF a esta carpeta como `esquema-bbdd.png`*

## Diccionario de Tablas Principales

| Tabla | Descripción |
|-------|-------------|
| **sncsdporderorderxlinespotsap** | Tabla central que almacena los registros de declaración (puesto, referencia, orden, cantidad y estado 0/1/2). |
| **linespot** | Define los puestos físicos de producción. Vincula con `systemcredentials`. |
| **systemcredentials** | Almacena el usuario y contraseña (cifrada) de SAP para cada puesto, además de las fechas de cambio de password. |
| **orders** | Contiene las órdenes de fabricación activas, vinculadas a un puesto (`linespot`). |
| **reference** | Maestro de referencias de producto vinculadas a las órdenes. |
| **users** | Usuarios de la aplicación web con sus roles y estados. |
| **rols** | Catálogo de roles: Operario, Responsable, Administrador. |

## Decisión Crítica de Diseño
La tabla **linespot** actúa como el eje del sistema. Al vincular el puesto físico con un registro de **systemcredentials**, el sistema puede determinar automáticamente qué usuario de SAP debe usar el robot. Esto es vital porque, en Maflow, el usuario de SAP determina físicamente a qué impresora de planta se envía la Galia.

## Relaciones con otros Diagramas
- Las entidades de este esquema mapean directamente con las identificadas en el [Modelo del Dominio](../../01-inicio/modelo-dominio/README.md).
- Los cambios de estado en `sncsdporderorderxlinespotsap` siguen el ciclo definido en los [Diagramas de Estado](../../02-elaboracion/diagramas-estado/README.md).
