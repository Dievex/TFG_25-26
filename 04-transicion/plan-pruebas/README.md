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

<sub>📍 Estás en: <b>Plan de Pruebas</b></sub>

</div>

***

# 🧪 Plan de Pruebas

El sistema ha sido sometido a un riguroso proceso de validación para asegurar el cumplimiento de los requisitos y la robustez de la automatización.

## Tipos de Pruebas Realizadas

1.  **Pruebas Unitarias:** Validación de los controladores de Node.js y las funciones de validación de datos en el frontend.
2.  **Pruebas de Integración:** Verificación de la comunicación entre la API web, la base de datos SQL Server y el robot UiPath.
3.  **Pruebas de Automatización (RPA):** Pruebas de estrés sobre la SAP GUI para asegurar que el robot gestiona correctamente tiempos de espera y errores de red.
4.  **Pruebas de Usuario (UAT):** Sesiones con operarios reales de Maflow para validar la usabilidad de la interfaz web.

## Casos de Prueba Críticos

| ID | Descripción | Resultado Esperado | Estado |
|----|-------------|--------------------|--------|
| **TP-01** | Registro de Galia válida | Datos en BD + Declaración en MES | ✅ |
| **TP-02** | Procesamiento en lote (20 docs) | Robot completa los 20 sin intervención | ✅ |
| **TP-03** | Error en SAP (Orden cerrada) | Registro marcado como estado 2, robot continúa | ✅ |
| **TP-04** | Cambio de password autónomo | Robot renueva credenciales antes de loguearse | ✅ |
| **TP-05** | Fallo de red durante ejecución | El robot reintenta 2 veces y luego aborta con log | ✅ |

## Entorno de Pruebas
Las pruebas se realizaron en un entorno simulado que replica exactamente la configuración de red y las versiones de software (SAP GUI, Windows Server) de la planta de Maflow Spain Automotive.
