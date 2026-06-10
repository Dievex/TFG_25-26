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
   style="padding:4px 10px;border-radius:12px;color:#57606a;text-decoration:none">
   🔨 03 · Construcción</a></td>
<td><b>·</b></td>
<td><a href="../../04-transicion/README.md"
   style="background:#dbeafe;padding:4px 10px;border-radius:12px;color:#1d4ed8;font-weight:bold;text-decoration:none">
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

<sub>📍 Estás en: <b>Casos de Uso en Interfaz</b></sub>

</div>

***

# 🖥️ Casos de Uso en Interfaz

A continuación se presentan capturas de pantalla representativas de los casos de uso más críticos ejecutándose en el sistema final desplegado.

## CU Registrar Declaración (Operario)
El operario utiliza esta interfaz para introducir los datos de producción. La validación en tiempo real evita errores de entrada antes de persistir en la BD.

![Captura CU1](./capturas/cu1-registrar.png)
*Figura 12: Interfaz de registro de producción. 📌 Sube la captura correspondiente del PDF a esta carpeta como `cu1-registrar.png`*

## CU Procesar Declaraciones (Robot RPA)
Captura del robot interactuando con la SAP GUI de forma autónoma, procesando el lote de Galias pendientes.

![Captura CU5](./capturas/cu5-robot-sap.png)
*Figura 13: El robot UiPath operando sobre SAP. 📌 Sube la captura correspondiente del PDF a esta carpeta como `cu5-robot-sap.png`*

## CU Consultar Log (Responsable)
Vista del log detallado donde se aprecia el estado de cada Galia tras la ejecución del robot.

![Captura CU10](./capturas/cu10-log.png)
*Figura 14: Panel de monitorización y log de resultados. 📌 Sube la captura correspondiente del PDF a esta carpeta como `cu10-log.png`*

## CU Cambiar Contraseña (Automático)
Flujo de mantenimiento donde el robot renueva las credenciales en la pantalla de gestión de usuarios de SAP.

![Captura CU7](./capturas/cu7-password.png)
*Figura 15: Proceso automático de renovación de contraseña. 📌 Sube la captura correspondiente del PDF a esta carpeta como `cu7-password.png`*
