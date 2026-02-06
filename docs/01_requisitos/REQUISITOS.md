# Especificación de Requisitos de Software

## 1. Introducción
Este documento detalla los requisitos funcionales y no funcionales para el sistema de automatización RPA en Maflow Spain. Define el comportamiento esperado del sistema y las restricciones bajo las que debe operar.

## 2. Requisitos Funcionales (RF)

### RF-01: Gestión de Sesión SAP
*   **RF-01.1**: El sistema debe identificar el puesto de trabajo físico desde el que se lanza la petición.
*   **RF-01.2**: El sistema debe seleccionar las credenciales SAP correctas asociadas a dicho puesto/impresora.
*   **RF-01.3**: El robot debe realizar el login en la GUI de SAP automáticamente, gestionando pantallas de bienvenida o mensajes de sistema iniciales.
*   **RF-01.4**: El sistema debe detectar fallos de login (credenciales incorrectas, usuario bloqueado) y notificar al administrador o gestionarlo.
*   **RF-01.5**: El sistema debe ser capaz de cerrar sesiones previas bloqueadas o inactivas antes de intentar un nuevo login.

### RF-02: Integración de Datos (MES -> RPA)
*   **RF-02.1**: El sistema debe leer los registros de producción pendientes (Orden, Referencia, Cantidad, Puesto) desde la base de datos compartida con el MES.
*   **RF-02.2**: El sistema debe validar que los datos mínimos necesarios (Orden y Cantidad > 0) están presentes antes de encolar la tarea.

### RF-03: Generación de Galias en SAP (Core RPA)
*   **RF-03.1**: El robot debe navegar a la transacción específica de generación de etiquetas Galia.
*   **RF-03.2**: El robot debe introducir los datos (Orden de Producción, Referencia de Racor, Cantidad, Puesto de Trabajo) en los campos correspondientes de la GUI mediante selectores robustos.
*   **RF-03.3**: El robot debe capturar y gestionar ventanas emergentes (pop-ups) de advertencia o error estándar de SAP (ej. "Material bloqueado", "Orden cerrada").

### RF-04: Gestión de Impresión
*   **RF-04.1**: El sistema debe asegurar que la impresión física se dirige a la impresora asociada al puesto de trabajo del usuario, seleccionando la el usuario en SAP correspondiente si es necesario.

### RF-05: Monitorización y Trazabilidad
*   **RF-05.1**: El sistema debe actualizar el estado de cada Galia en la base de datos local del RPA:
    *   `PENDIENTE`: Registrada pero no procesada.
    *   `COMPLETADA`: Generada correctamente en SAP.
    *   `ERROR`: Fallo técnico o de negocio.
*   **RF-05.2**: El sistema debe generar un log técnico detallado (Timestamp, Usuario SAP, Acción, Resultado) para auditoría.

## 3. Requisitos No Funcionales (RNF)

### RNF-01: Rendimiento
*   **RNF-01.1**: El tiempo de interacción del operario para lanzar un lote debe ser mínimo (< 30 segundos).
*   **RNF-01.2**: El sistema RPA debe ser capaz de procesar una cola de al menos 20 Galias de forma secuencial sin intervención humana.
*   **RNF-01.3**: El tiempo de procesamiento por Galia en SAP no debe exceder significativamente el tiempo manual (objetivo: < 20 segundos/galia).

### RNF-02: Fiabilidad y Robustez
*   **RNF-02.1**: La tasa de error de transcripción de datos debe ser del 0% (eliminación de error humano).
*   **RNF-02.2**: Si ocurre un error fatal en una Galia, el sistema debe ser capaz de continuar con la siguiente del lote (aislamiento de fallos).

### RNF-03: Usabilidad
*   **RNF-03.1**: La interfaz del operario debe ser minimalista, tipo "Semáforo" (Verde/Rojo), sin requerir conocimientos técnicos de RPA.
*   **RNF-03.2**: Los mensajes de error mostrados al operario deben ser claros y accionables (ej. "Avisa al supervisor: Orden Bloqueada").

### RNF-04: Restricciones de Implementación
*   **RNF-04.1**: La interacción con SAP debe realizarse estrictamente a través de **SAP GUI Scripting** o reconocimiento de objetos visuales, sin utilizar APIs de backend (BAPIs/RFCs) no autorizadas.
*   **RNF-04.2**: No se permite modificar el código fuente del sistema MES existente para ello se debe consultar a la empresa responsable de su desarrollo (acceso de solo lectura).
