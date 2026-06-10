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

<sub>📍 Estás en: <b>Conclusiones</b></sub>

</div>

***

# 🎓 Conclusiones

El desarrollo de este TFG ha permitido validar la eficacia de la tecnología RPA como puente de integración en entornos industriales rígidos.

## Conclusiones Principales

- **RPA como solución táctica y estratégica:** Se demuestra que RPA es la herramienta adecuada para integrar sistemas ERP (como SAP) que carecen de APIs accesibles, actuando como una capa de integración intermedia vital para la Industria 4.0.
- **Robustez mediante diseño:** La arquitectura de 4 capas y el aislamiento de la lógica de automatización minimizan el impacto de cambios externos en la GUI de SAP, garantizando la sostenibilidad de la solución.
- **Continuidad operativa:** El mecanismo de cambio automático de contraseña (cada 28 días) se ha revelado como un elemento crítico para evitar paradas de producción por bloqueos de cuenta.
- **Eficiencia en planta:** La integración simultánea en SAP y MES elimina la duplicidad de tareas y asegura que ambos sistemas contengan información coherente en tiempo real.
- **Viabilidad técnica:** El nivel TRL 5-6 alcanzado confirma que la solución es apta para su despliegue en un entorno operacional real.

## Futuras Líneas de Actuación

Para evolucionar el sistema, se proponen las siguientes mejoras:
1.  **Ampliación de alcance:** Extender el uso del robot a otras transacciones de SAP en Maflow, como el picking de materiales o la recepción de pedidos.
2.  **Hyperautomation:** Incorporar modelos de Inteligencia Artificial para la lectura y procesamiento de pedidos no estructurados (PDFs o correos) antes de su entrada al sistema.
3.  **Migración a API:** En caso de que Maflow migre a SAP S/4HANA, evolucionar el robot hacia una integración directa vía API, manteniendo la misma interfaz web.
4.  **Monitorización avanzada:** Desarrollar un dashboard analítico para que los responsables de planta puedan visualizar tendencias de producción y estados del robot en tiempo real.
