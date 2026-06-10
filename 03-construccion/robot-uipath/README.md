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

<sub>📍 Estás en: <b>Robot UiPath</b></sub>

</div>

***

# 🤖 Robot UiPath

El robot desarrollado en UiPath es el núcleo de la automatización, encargado de interactuar con la SAP GUI imitando el comportamiento humano de forma acelerada y sin errores.

## Flujo Lógico de Ejecución

1.  **Activación:** El servidor Node.js lanza el robot mediante una petición HTTP (script de disparo).
2.  **Verificación de Seguridad:** El robot consulta en la tabla `systemcredentials` los días transcurridos desde el último cambio de contraseña.
3.  **Mantenimiento Autónomo:** Si han pasado **≥28 días**, ejecuta automáticamente el flujo de cambio de contraseña en SAP.
4.  **Acceso a SAP:** Abre la SAP GUI utilizando las credenciales recuperadas según el puesto de trabajo origen.
5.  **Ejecución de Transacción:** Navega a la transacción de declaración de producción en SAP.
6.  **Procesamiento en Lote:**
    - Lee todos los registros con `estado=0`.
    - Por cada uno: introduce referencia, orden y cantidad.
    - Actualiza el estado a `1` (Completado) o `2` (Error).
7.  **Cierre:** Finaliza la sesión en SAP y actualiza su estado global a `Inactivo`.

![Flujo Robot UiPath](./diagramas/flujo-robot.png)
*Figura 8: Diagrama de flujo detallado de la lógica UiPath. 📌 Sube el diagrama correspondiente del PDF a esta carpeta como `flujo-robot.png`*

## Gestión de Errores Críticos
Para asegurar el cumplimiento de los RNF de disponibilidad y robustez:
- **Credenciales incorrectas:** El robot aborta inmediatamente y marca un `Error Crítico` para evitar el bloqueo de la cuenta.
- **Cuenta bloqueada:** Si detecta el mensaje de bloqueo en SAP, notifica automáticamente al Administrador SAP.
- **SAP GUI no responde:** Implementa una política de 2 reintentos. Al tercero, aborta la ejecución para evitar bucles infinitos.

## Optimización
Siguiendo el **RNF-01**, el robot utiliza técnicas de "Simulate Type" y selectores basados en propiedades estables para garantizar un tiempo de procesamiento inferior a 15 segundos por documento Galia.
