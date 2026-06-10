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

<sub>📍 Estás en: <b>Requisitos RF/RNF</b></sub>

</div>

***

# 📋 Requisitos RF/RNF

A continuación se detallan los requisitos no funcionales (RNF) que garantizan la calidad, seguridad y rendimiento del sistema.

## Requisitos No Funcionales (RNF-01 a RNF-15)

### Rendimiento
- **RNF-01:** El robot debe procesar cada registro en SAP en un tiempo máximo de 15 segundos por Galia.
- **RNF-02:** La interfaz web debe cargar los desplegables en menos de 2 segundos tras cada selección.
- **RNF-03:** El sistema debe soportar el procesamiento de al menos 20 Galias en una misma ejecución de lote.

### Disponibilidad
- **RNF-04:** El servidor de aplicaciones debe estar operativo 24/7 durante todos los turnos de producción.
- **RNF-05:** La interfaz web debe ser accesible desde cualquier dispositivo autorizado dentro de la red interna de la planta.
- **RNF-06:** Ante un fallo en un registro concreto, el sistema NO debe interrumpir el procesamiento del resto del lote.

### Seguridad
- **RNF-07:** El cambio automático de contraseña debe ejecutarse antes del día 30 (configurado por defecto al día 28).
- **RNF-08:** El robot no debe realizar más de 2 intentos de login fallidos para evitar el bloqueo automático de la cuenta en SAP.
- **RNF-09:** El acceso a la interfaz web está restringido exclusivamente a la red interna de la planta de Maflow.

### Mantenibilidad
- **RNF-10:** Los estados de los registros (0, 1, 2) deben persistirse en la BD para asegurar trazabilidad y auditoría.
- **RNF-11:** El sistema debe registrar logs detallados de cada ejecución del robot, incluyendo fecha y registros procesados.

### Plataforma y Tecnologías
- **RNF-12:** La interfaz web debe desarrollarse utilizando React y Node.js/Express.
- **RNF-13:** El robot debe ejecutarse sobre el entorno UiPath instalado en el servidor Windows de la planta.
- **RNF-14:** El sistema debe ser 100% compatible con la versión de SAP GUI actualmente instalada en Maflow.
- **RNF-15:** La base de datos debe implementarse en Microsoft SQL Server, compartiendo instancia con el MES Apriso.
