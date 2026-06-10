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

<sub>📍 Estás en: <b>Resultados y Métricas</b></sub>

</div>

***

# 📊 Resultados y Métricas

En esta sección se contrastan los resultados obtenidos tras el despliegue del sistema frente a los objetivos específicos (OE) definidos al inicio del TFG.

## Comparativa Objetivos vs. Resultados

| Objetivo | Meta Inicial | Resultado Alcanzado | Estado |
|----------|--------------|---------------------|--------|
| **OE1 - Requisitos** | Especificar 100% RF/RNF | 15 RF + 15 RNF documentados | ✅ |
| **OE2 - Análisis y Diseño** | Arquitectura RPA robusta | 4 capas (React/Node/UiPath/SQL) | ✅ |
| **OE3 - Desarrollo** | Sistema desplegable | TRL 5-6 alcanzado en planta | ✅ |
| **OE4 - Rendimiento (Tiempo)** | Reducción ≥ 80% | **87.5% de reducción** | ✅ |
| **OE4 - Calidad (Errores)** | Reducción ≥ 95% | **95% de eliminación de errores** | ✅ |
| **OE4 - Escalabilidad (Lote)** | ≥ 20 Galias/lote | **20+ documentos procesados** | ✅ |

## Métricas de Impacto en Maflow

- **Tiempo manual anterior:** ~2 minutos por cada documento Galia.
- **Tiempo con sistema RPA:** ~15 segundos de entrada de datos por Galia (el resto es automático).
- **Trazabilidad:** 100% de las acciones del robot quedan registradas en el log con fecha, hora, usuario y estado SAP.
- **Reducción de errores:** Se ha eliminado prácticamente la totalidad de los errores de transcripción (números de orden o referencias erróneas) gracias a la validación previa en la interfaz web contra el MES.

## Resumen de Desempeño
El sistema no solo ha cumplido los objetivos propuestos, sino que ha demostrado una estabilidad superior a la esperada en el procesamiento en lote, permitiendo que el operario dedique el 87% del tiempo que antes perdía en SAP a tareas de valor añadido en la línea de producción.
