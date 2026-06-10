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

<sub>📍 Estás en: <b>Análisis de Riesgos</b></sub>

</div>

***

# ⚠️ Análisis de Riesgos

El uso de RPA introduce riesgos específicos debido a su dependencia de interfaces gráficas de terceros. A continuación se detallan los riesgos identificados y sus estrategias de mitigación.

## Matriz de Riesgos

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| **Fragilidad ante cambios GUI** | Crítico | Media | Arquitectura en capas que aísla la lógica RPA y uso de selectores robustos en UiPath. |
| **Bloqueo de cuenta SAP** | Crítico | Baja | Implementación de cambio automático de contraseña cada 28 días (antes del límite de 30). |
| **Falta de acceso a APIs** | Alto | Alta (Fija) | Toda la solución se diseña específicamente para operar sobre la SAP GUI. |
| **Dependencia del MES (Apriso)** | Medio | Media | Gestión de estados independiente en base de datos propia para asegurar persistencia. |
| **Inconsistencia SAP/MES** | Alto | Baja | Uso de transacciones en BD y validación de estados tras cada paso del robot. |

## Riesgos Críticos en Detalle

### 1. Fragilidad de la Interfaz Gráfica
Si SAP actualiza su versión o cambia la disposición de sus elementos, el robot podría dejar de encontrar los campos necesarios. La solución ha sido encapsular todas las interacciones en una **capa de automatización** independiente, facilitando su actualización sin tocar el resto del sistema.

### 2. Gestión de Credenciales SAP
SAP bloquea las cuentas si la contraseña no se cambia cada 30 días o si hay intentos fallidos. El sistema incluye un control estricto:
- **Cambio proactivo:** A los 28 días, el robot realiza el cambio de forma autónoma.
- **Límite de intentos:** El robot tiene prohibido realizar más de 2 intentos de login fallidos.
