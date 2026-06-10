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

<sub>📍 Estás en: <b>Casos de Uso Detallados</b></sub>

</div>

***

# 📝 Casos de Uso Detallados

Se han identificado un total de 17 casos de uso (CU) que cubren todas las funcionalidades necesarias para la gestión de Galias y la administración del sistema.

## Listado de Casos de Uso

| CU | Nombre | Actor Principal | Prioridad |
|----|--------|----------------|-----------|
| **CU1** | Registrar declaración | Operario | Alta |
| **CU2** | Guardar registro | Operario | Alta |
| **CU3** | Enviar a SAP | Operario | Alta |
| **CU4** | Loguearse en SAP | RobotRPA | Alta |
| **CU5** | Procesar declaraciones | RobotRPA | Alta |
| **CU6** | Iniciar sesión | Todos | Alta |
| **CU7** | Cambio automático contraseña | RobotRPA | Media |
| **CU8** | Imprimir Galia | SAP | Media |
| **CU9** | Consultar log propio | Operario | Media |
| **CU10** | Consultar log completo | Responsable | Media |
| **CU11** | Actualizar registro | Responsable | Media |
| **CU12** | Crear usuario | Administrador | Baja |
| **CU13** | Consultar usuarios | Administrador | Baja |
| **CU14** | Actualizar usuario | Administrador | Baja |
| **CU15** | Eliminar usuario | Administrador | Baja |
| **CU16** | Eliminar registro | Responsable | Baja |
| **CU17** | Desbloquear cuenta SAP | AdminSAP | Baja |

## Detalle de Actores
- **Operario:** Usuario principal en planta. Introduce datos.
- **Responsable:** Supervisa la producción y corrige errores de registro.
- **Administrador:** Gestión total de identidades y roles.
- **RobotRPA:** Actor de sistema que automatiza la interacción con SAP GUI.
- **AdministradorSAP:** Interviene solo en casos críticos de bloqueo de cuenta.

## Priorización
La prioridad se ha calculado sumando el Riesgo Arquitectónico (1-3), el Valor de Negocio (1-3) y la Frecuencia de Uso (1-3):
- **Alta (Score 9/9):** CU1 a CU6 (Núcleo del sistema).
- **Media (Score 6-7):** CU7 a CU11 (Gestión y robustez).
- **Baja (Score 3-5):** CU12 a CU17 (Administración y casos excepcionales).
