# Documento de Visión del proyecto

## 1. Introducción
Este documento define la visión del proyecto **"Sistema de Automatización mediante RPA para Optimización de Procesos Productivos SAP en Entorno Industrial en Maflow Spain automotive"**. Proporciona una base para los requisitos técnicos y describe el "qué" y el "por qué" del sistema.

## 2. Posicionamiento

### 2.1 Declaración del Problema
| Elemento | Descripción |
| --- | --- |
| **El problema** | Ineficiencia temporal, redundancia de datos e inconsistencias entre SAP y MES en la generación de documentos Galia y declaración de piezas. |
| **Afecta a** | Operarios de producción, supervisores y departamento de calidad de Maflow Spain. |
| **El impacto es** | Pérdida de tiempo (~2 min/Galia), errores humanos de transcripción (95%) y descuadres de trazabilidad. |
| **Una solución exitosa sería** | Un sistema RPA que automatice la interacción con la GUI de SAP, reduciendo el tiempo de gestión a ~15s y eliminando la doble entrada de datos. |

### 2.2 Declaración de la Posición del Producto
Para **Maflow Spain Automotive**, que necesita optimizar sus procesos de declaración de producción en SAP, el **Sistema RPA-SAP** es una solución de automatización que integra el MES existente con SAP mediante robots de software. A diferencia del proceso manual actual, mi producto permite la ejecución en lote, validación automática y trazabilidad completa sin necesidad de modificar el núcleo de SAP o MES.

## 3. Descripción de los Stakeholders y Usuarios

| Nombre | Descripción | Responsabilidades |
| --- | --- | --- |
| **Operario de Producción** | Usuario final en planta. | Registrar producción en MES, lanzar lotes de Galias. |
| **Supervisor de Producción** | Responsable de turno/línea. | Validar producción, consultar informes de rendimiento. |
| **Equipo IT / Admin RPA** | Soporte técnico. | Configurar usuarios SAP, mantener robots, revisar logs de auditoría. |
| **Personal de Calidad** | Auditoría. | Verificar trazabilidad de piezas mediante Galias. |

## 4. Resumen de Capacidades del Sistema (Features)

1.  **Automatización de Login SAP**: Gestión automática de credenciales basada en el puesto físico/impresora.
2.  **Integración MES-SAP**: Lectura de datos de producción desde BD intermedia para evitar doble entrada.
3.  **Procesamiento por Lotes**: Capacidad de generar colas de >20 Galias secuencialmente.
4.  **Interacción GUI Pura**: Funcionamiento sin APIs, replicando acciones humanas sobre la interfaz de SAP.
5.  **Trazabilidad y Logging**: Registro detallado de cada operación para auditoría y corrección de errores.
6.  **Interfaz Operario Simplificada**: Panel para selección de lotes y visualización de estado (Pendiente/OK/Error).

## 5. Restricciones Principales
*   **Técnicas**: No se permite uso de APIs de SAP. Interacción exclusiva vía GUI.
*   **Entorno**: No se puede modificar el código fuente ni la lógica del sistema MES existente.
