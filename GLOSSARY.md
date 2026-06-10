# 📖 Glosario de Términos

Este glosario define los conceptos clave, técnicos y de negocio, utilizados a lo largo de todo el proyecto TFG.

| Término | Definición |
|---------|------------|
| **Galia / ETI 9** | Documento físico de trazabilidad que acompaña a cada lote de piezas. Es el producto final del proceso automatizado. |
| **RPA** | *Robotic Process Automation*. Tecnología que automatiza tareas repetitivas sobre interfaces gráficas sin necesidad de APIs. |
| **SAP** | ERP corporativo utilizado en Maflow para la declaración de producción y envío de Galias a imprimir. |
| **MES** | *Manufacturing Execution System*. Sistema externo de gestión de producción en planta. En Maflow se utiliza **Apriso**. |
| **Puesto de Trabajo** | Ubicación física en la línea de producción. Determina el usuario SAP del robot y la impresora destino. |
| **Referencia** | Código identificador de una pieza o producto fabricado. |
| **Orden de Fabricación** | Instrucción de producción abierta en SAP para una referencia concreta en un puesto determinado. |
| **Declaración de producción** | Registro en SAP de las unidades fabricadas. Antes manual, ahora automatizado mediante RPA. |
| **Operario** | Usuario final que introduce datos en la interfaz web sin necesidad de acceder a SAP ni al MES. |
| **Interfaz Web** | Aplicación React/Node que conecta con el MES para obtener datos y persiste los registros en la BD. |
| **Registro** | Unidad de información (puesto + referencia + orden + cantidad). Estados: 0=sin procesar, 1=completada, 2=error. |
| **Robot RPA** | Proceso UiPath activado por HTTP que lee la BD, se loguea en SAP y completa la declaración. |
| **Cambio de contraseña** | Mecanismo autónomo que detecta si han pasado ≥28 días y renueva la contraseña de SAP. |
| **Estado de Galia** | Indicador del progreso: 0=pendiente, 1=completada correctamente, 2=error en SAP. |
| **TRL** | *Technology Readiness Level*. Nivel de madurez tecnológica. El objetivo de este proyecto es alcanzar un **TRL 5-6**. |
